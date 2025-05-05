import {Controller, Post, Body, UseGuards, Req, UnauthorizedException} from '@nestjs/common';
import {SendAuthCodeUseCase} from '@/application/auth/send-auth-code.usecase';
import {VerifyAuthCodeUseCase} from '@/application/auth/verify-auth-code.usecase';
import {IssueTokensUseCase} from '@/application/auth/issue-tokens.usecase';
import {RevokeTokensUseCase} from '@/application/auth/revoke-tokens.usecase';
import {JwtAuthGuard} from '@/shared/guards/jwt-auth.guard';
import {Request} from 'express';

export interface RequestWithUser extends Request {
    user: {
        sub: string;
        iat: number;
        exp: number;
        // 필요 시 더 추가…
    };
}

class EmailDto {
    email!: string;
}

class CodeDto {
    email!: string;
    code!: string;
}

@Controller('auth')
export class AuthController {
    constructor(
        private readonly sendCode: SendAuthCodeUseCase,
        private readonly verifyCode: VerifyAuthCodeUseCase,
        private readonly issueTokens: IssueTokensUseCase,
        private readonly revokeTokens: RevokeTokensUseCase,
    ) {
    }

    @Post('send-code')
    send(@Body() dto: EmailDto) {
        return this.sendCode.execute(dto.email);
    }

    @Post('verify-code')
    verify(@Body() dto: CodeDto) {
        return this.verifyCode.execute(dto.email, dto.code);
    }

    @Post('login')
    issue(@Body() dto: EmailDto) {
        return this.issueTokens.execute(dto.email);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    logout(@Req() req: RequestWithUser) {
        // 1) user 객체가 없으면 401
        if (!req.user || !req.user.sub) {
            throw new UnauthorizedException('로그인된 사용자가 아닙니다.');
        }
        // 2) 서브젝트(sub)를 email 로 사용
        const email = req.user.sub;
        return this.revokeTokens.execute(email);
    }
}