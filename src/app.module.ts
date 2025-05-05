import {Module} from '@nestjs/common';
import {ScheduleModule} from '@nestjs/schedule';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';

import {PrismaModule} from './infrastructure/persistence/prisma/prisma.module';
import {RedisModule} from './shared/redis.module';
import {LlmModule} from './infrastructure/external/llm/llm.module';
import {SchedulerModule} from './infrastructure/adapters/scheduler/scheduler.module';

import {ArticleModule} from './application/article/article.module';
import {CategoryModule} from './application/category/category.module';
import {AuthModule} from './application/auth/auth.module';
import {UserModule} from './application/user/user.module';

@Module({
    imports: [
        ScheduleModule.forRoot(),
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'default_secret',
            signOptions: {expiresIn: '1h'},
        }),
        PrismaModule,
        RedisModule,
        LlmModule,
        ArticleModule,
        CategoryModule,
        AuthModule,
        UserModule,
        SchedulerModule,
    ],
})
export class AppModule {
}
