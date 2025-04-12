// test/auth/auth.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '@/auth/auth.service';
import { UserService } from '@/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '@/shared/redis.service';
import { MailService } from '@/shared/mail.service';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

let mockUser: any;

describe('AuthService', () => {
    let authService: AuthService;
    let userService: Partial<UserService>;
    let jwtService: Partial<JwtService>;
    let redisService: Partial<RedisService>;
    let mailService: Partial<MailService>;

    beforeEach(async () => {
        mockUser = {
            id: 1,
            email: 'test@example.com',
            password: await bcrypt.hash('password123', 10),
        };

        userService = {
            findByEmail: jest.fn().mockResolvedValue(mockUser),
        };

        jwtService = {
            sign: jest.fn().mockReturnValue('signed-token'),
            verify: jest.fn().mockReturnValue({ sub: mockUser.id, email: mockUser.email }),
        };

        redisService = {
            set: jest.fn(),
            get: jest.fn().mockResolvedValue('123456'),
            delete: jest.fn(),
        };

        mailService = {
            sendEmailVerification: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: UserService, useValue: userService },
                { provide: JwtService, useValue: jwtService },
                { provide: RedisService, useValue: redisService },
                { provide: MailService, useValue: mailService },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
    });

    describe('validateUser', () => {
        it('should validate correct credentials', async () => {
            const result = await authService.validateUser(mockUser.email, 'password123');
            expect(result.email).toEqual(mockUser.email);
        });

        it('should throw for wrong password', async () => {
            await expect(authService.validateUser(mockUser.email, 'wrong')).rejects.toThrow(UnauthorizedException);
        });
    });

    describe('sendEmailVerification', () => {
        it('should store code in redis and send email', async () => {
            await authService.sendEmailVerification('test@example.com');
            expect(redisService.set).toHaveBeenCalled();
            expect(mailService.sendEmailVerification).toHaveBeenCalled();
        });
    });

    describe('verifyEmailCode', () => {
        it('should pass with correct code', async () => {
            await expect(authService.verifyEmailCode('test@example.com', '123456')).resolves.toBeUndefined();
        });

        it('should throw on wrong code', async () => {
            redisService.get = jest.fn().mockResolvedValue('999999');
            await expect(authService.verifyEmailCode('test@example.com', '123456')).rejects.toThrow(UnauthorizedException);
        });
    });

    describe('refreshToken', () => {
        it('should refresh token if valid', async () => {
            redisService.get = jest.fn().mockResolvedValue('valid-refresh-token');
            jwtService.verify = jest.fn().mockReturnValue({ sub: 1, email: 'test@example.com' });
            const result = await authService.refreshToken('valid-refresh-token');
            expect(result).toHaveProperty('accessToken');
            expect(result).toHaveProperty('refreshToken');
        });

        it('should throw if token invalid', async () => {
            jwtService.verify = jest.fn().mockImplementation(() => {
                throw new Error('Invalid token');
            });
            await expect(authService.refreshToken('invalid')).rejects.toThrow(UnauthorizedException);
        });
    });
});
