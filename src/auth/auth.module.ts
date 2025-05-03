import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { JwtStrategy } from './jwt/jwt.strategy';
import { JwtRefreshStrategy } from './jwt/jwt.refresh.strategy';
import { UserModule } from '@/user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        JwtModule.register({}),
        UserModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthRepository, JwtStrategy, JwtRefreshStrategy],
})
export class AuthModule {}