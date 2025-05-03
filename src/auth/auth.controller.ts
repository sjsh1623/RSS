import {
    Body,
    Controller,
    Post,
    UseGuards,
    Req,
} from '@nestjs/common';
import {Request} from 'express';
import {AuthService} from './auth.service';
import {SendCodeRequestDto} from './dto/send-code-request.dto';
import {VerifyCodeRequestDto} from './dto/verify-code-request.dto';
import {LoginRequestDto} from './dto/login-request.dto';
import {JwtAuthGuard} from './jwt/jwt.guard';
import {AuthGuard} from "@nestjs/passport";
import {JwtPayloadWithRefresh} from "@/auth/interfaces/user-jwt-payload.interface";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('signup/send-code')
    async sendCode(@Body() dto: SendCodeRequestDto) {
        await this.authService.sendEmailVerification(dto.email);
        return {message: '인증 코드가 전송되었습니다.'};
    }

    @Post('signup/verify')
    async verifyCode(@Body() dto: VerifyCodeRequestDto) {
        await this.authService.verifyEmailCode(dto.email, dto.code);
        return {message: '이메일 인증이 완료되었습니다.'};
    }

    @Post('login')
    async login(@Body() dto: LoginRequestDto) {
        const user = await this.authService.validateUser(dto.email, dto.password);
        return this.authService.login(user);
    }


    @UseGuards(AuthGuard('jwt-refresh'))
    @Post('refresh')
    async refresh(@Req() req: Request & { user: JwtPayloadWithRefresh }) {
        return this.authService.refreshAccessToken(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('me')
    async getMe(@Req() req) {
        return req.user;
    }
}