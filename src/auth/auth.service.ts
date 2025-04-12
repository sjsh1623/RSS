import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '@/user/user.service';
import { RedisService } from '@/shared/redis.service';
import { MailService } from '@/shared/mail.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly redisService: RedisService,
        private readonly mailService: MailService,
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
        }
        return user;
    }

    async login(user: any) {
        const payload = { sub: user.id, email: user.email };

        const accessToken = this.jwtService.sign(payload);

        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
        });

        const ttl = parseInt(process.env.JWT_REFRESH_TTL || '1296000', 10); // 기본값: 15일
        await this.redisService.set(`refresh:${user.id}`, refreshToken, ttl);

        return { accessToken, refreshToken };
    }

    async sendEmailVerification(email: string) {
        const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6자리
        await this.redisService.set(`verify:${email}`, code, 180); // 3분
        await this.mailService.sendEmailVerification(email, code);
    }

    async verifyEmailCode(email: string, code: string) {
        const stored = await this.redisService.get(`verify:${email}`);
        if (!stored || stored !== code) {
            throw new UnauthorizedException('인증 코드가 올바르지 않거나 만료되었습니다.');
        }

        await this.redisService.delete(`verify:${email}`); // 인증 후 삭제
    }

    async refreshToken(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });

            const stored = await this.redisService.get(`refresh:${payload.sub}`);
            if (!stored || stored !== refreshToken) {
                throw new UnauthorizedException('Refresh token is invalid or expired.');
            }

            const newPayload = { sub: payload.sub, email: payload.email };
            const accessToken = this.jwtService.sign(newPayload);
            const newRefreshToken = this.jwtService.sign(newPayload, {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
            });

            const ttl = parseInt(process.env.JWT_REFRESH_TTL || '1296000', 10);
            await this.redisService.set(`refresh:${payload.sub}`, newRefreshToken, ttl);

            return { accessToken, refreshToken: newRefreshToken };
        } catch (e) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
}