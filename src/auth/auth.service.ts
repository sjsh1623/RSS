import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import {UserService} from '@/user/user.service';
import {RedisService} from '@/shared/redis.service';
import {MailService} from '@/shared/mail.service';
import {AuthRepository} from './auth.repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly redisService: RedisService,
        private readonly mailService: MailService,
        private readonly authRepository: AuthRepository,
    ) {
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        const isPasswordValid = user && await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
        }

        return user;
    }

    async login(user: any) {
        const payload = {sub: user.id, email: user.email};
        const accessToken = this.jwtService.sign(payload, {expiresIn: '1h'});
        const refreshToken = this.jwtService.sign(payload, {expiresIn: '7d'});

        await this.redisService.set(`refresh:${user.id}`, refreshToken, 604800); // 7일

        return {accessToken, refreshToken};
    }

    async refreshAccessToken(user: { id: number; email: string; refreshToken: string }) {
        const savedToken = await this.redisService.get(`refresh:${user.id}`);
        if (savedToken !== user.refreshToken) {
            throw new UnauthorizedException('리프레시 토큰이 유효하지 않습니다.');
        }

        const newAccessToken = this.jwtService.sign(
            {sub: user.id, email: user.email},
            {expiresIn: '1h'},
        );

        return {accessToken: newAccessToken};
    }

    async sendEmailVerification(email: string) {
        const verificationCode = this.authRepository.generateVerificationCode();
        await this.redisService.set(`verify:${email}`, verificationCode, 300); // 5분
        //await this.mailService.sendCode(email, verificationCode);
    }

    async verifyEmailCode(email: string, code: string) {
        const savedCode = await this.redisService.get(`verify:${email}`);
        if (savedCode !== code) {
            throw new UnauthorizedException('인증 코드가 일치하지 않습니다.');
        }
    }
}