import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptionsWithRequest } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(private readonly configService: ConfigService) {
        const jwtSecret = configService.get<string>('JWT_REFRESH_SECRET');
        if (!jwtSecret) {
            throw new Error('JWT_REFRESH_SECRET is not defined');
        }

        const options: StrategyOptionsWithRequest = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret,
            passReqToCallback: true,
        };

        super(options);
    }

    async validate(req: Request, payload: any) {
        // 리프레시 토큰 본문 그대로 가져오기 위해 req에서 꺼냄
        const refreshToken = req.headers.authorization?.replace('Bearer ', '');

        return {
            id: payload.sub,
            email: payload.email,
            refreshToken,
        };
    }
}