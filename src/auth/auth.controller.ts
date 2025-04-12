import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt.gaurd';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup/send-code')
    async sendCode(@Body('email') email: string) {
        await this.authService.sendEmailVerification(email);
        return { message: '인증 코드가 전송되었습니다.' };
    }

    @Post('signup/verify')
    async verifyCode(@Body() body: { email: string; code: string }) {
        await this.authService.verifyEmailCode(body.email, body.code);
        return { message: '이메일 인증이 완료되었습니다.' };
    }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        const user = await this.authService.validateUser(body.email, body.password);
        return this.authService.login(user);
    }

    @Post('refresh')
    async refresh(@Body('refreshToken') refreshToken: string) {
        return this.authService.refreshToken(refreshToken);
    }

    @UseGuards(JwtAuthGuard)
    @Post('me')
    async getMe(@Req() req) {
        return req.user;
    }
}