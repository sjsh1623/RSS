import {Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {AuthController} from "@/interfaces/controllers/auth.controller";
import {RedisModule} from "@/shared/redis.module";
import {PrismaModule} from "@/infrastructure/persistence/prisma/prisma.module";
import {TokenRepositoryImpl} from "@/infrastructure/persistence/prisma/token.repository.impl";
import {SendAuthCodeUseCase} from "@/application/auth/send-auth-code.usecase";
import {VerifyAuthCodeUseCase} from "@/application/auth/verify-auth-code.usecase";
import {IssueTokensUseCase} from "@/application/auth/issue-tokens.usecase";
import {RevokeTokensUseCase} from "@/application/auth/revoke-tokens.usecase";
import {AuthCodeRepositoryImpl} from "@/infrastructure/persistence/prisma/auth-code.repository.impl";
import {JwtStrategy} from "@/shared/strategies/jwt.strategy";
import {MailModule} from "@/shared/utils/mail.module";
import {
    AUTH_CODE_REPOSITORY,
    TOKEN_REPOSITORY,
    PersistenceModule
} from "@/infrastructure/persistence/persistence.module";

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'default_secret',
            signOptions: {expiresIn: '1h'},
        }),
        PrismaModule,
        RedisModule,
        MailModule,
        PersistenceModule
    ],
    controllers: [AuthController],
    providers: [
        {provide: AUTH_CODE_REPOSITORY, useClass: AuthCodeRepositoryImpl},
        {provide: TOKEN_REPOSITORY, useClass: TokenRepositoryImpl},
        SendAuthCodeUseCase,
        VerifyAuthCodeUseCase,
        IssueTokensUseCase,
        RevokeTokensUseCase,
        JwtStrategy,
    ],
    exports: [],
})
export class AuthModule {
}
