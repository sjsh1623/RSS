// src/auth/auth.module.ts
import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {JwtModule} from '@nestjs/jwt';
import {JwtStrategy} from './jwt/jwt.strategy';
import {JwtRefreshStrategy} from './jwt/jwt.refresh.strategy';
import {UserModule} from '@/user/user.module';
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot(), // ✅ .env 설정 불러오기
        JwtModule.register({}), // 토큰 서명은 AuthService에서 수행
        UserModule,
        JwtModule.register({}), // configService를 통해 동적 등록 예정
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, JwtRefreshStrategy],
})
export class AuthModule {
}
