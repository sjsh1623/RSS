import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { SendCodeRequestDto } from '../dto/send-code-request.dto';
import { VerifyCodeRequestDto } from '../dto/verify-code-request.dto';
import { LoginRequestDto } from '../dto/login-request.dto';

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;

    const mockAuthService = {
        sendEmailVerification: jest.fn(),
        verifyEmailCode: jest.fn(),
        validateUser: jest.fn(),
        login: jest.fn(),
        refreshAccessToken: jest.fn(),
    };

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: mockAuthService,
                },
            ],
        }).compile();

        authController = moduleRef.get<AuthController>(AuthController);
        authService = moduleRef.get<AuthService>(AuthService);
    });

    it('should send email verification code', async () => {
        const dto: SendCodeRequestDto = { email: 'test@example.com' };
        await authController.sendCode(dto);
        expect(authService.sendEmailVerification).toHaveBeenCalledWith(dto.email);
    });

    it('should verify email code', async () => {
        const dto: VerifyCodeRequestDto = { email: 'test@example.com', code: '123456' };
        await authController.verifyCode(dto);
        expect(authService.verifyEmailCode).toHaveBeenCalledWith(dto.email, dto.code);
    });

    it('should login and return tokens', async () => {
        const dto: LoginRequestDto = { email: 'user@test.com', password: 'pass1234' };
        const mockUser = { id: 1, email: dto.email };
        const mockTokens = { accessToken: 'access', refreshToken: 'refresh' };

        mockAuthService.validateUser.mockResolvedValue(mockUser);
        mockAuthService.login.mockResolvedValue(mockTokens);

        const result = await authController.login(dto);
        expect(result).toEqual(mockTokens);
    });

    it('should refresh token', async () => {
        const mockUser = { id: 1, email: 'test@test.com', refreshToken: 'abc' };
        const mockToken = { accessToken: 'newToken' };

        mockAuthService.refreshAccessToken.mockResolvedValue(mockToken);
        const result = await authController.refresh({ user: mockUser } as any);
        expect(result).toEqual(mockToken);
    });

    it('should return current user (me)', async () => {
        const req = { user: { id: 1, email: 'me@test.com' } };
        const result = await authController.getMe(req as any);
        expect(result).toEqual(req.user);
    });
});