import {Module} from '@nestjs/common';
import {PrismaModule} from '@/infrastructure/persistence/prisma/prisma.module';
import {RedisModule} from '@/shared/redis.module';
import {UserController} from '@/interfaces/controllers/user.controller';
import {RegisterUserUseCase} from './register-user.usecase';
import {LoginUserUseCase} from './login-user.usecase';
import {UserRepositoryImpl} from '@/infrastructure/persistence/prisma/user.repository.impl';
import {USER_REPOSITORY} from "@/infrastructure/persistence/persistence.module";

@Module({
    imports: [PrismaModule, RedisModule],
    controllers: [UserController],
    providers: [
        {provide: USER_REPOSITORY, useClass: UserRepositoryImpl},
        RegisterUserUseCase,
        LoginUserUseCase,
    ],
    exports: [],
})
export class UserModule {
}
