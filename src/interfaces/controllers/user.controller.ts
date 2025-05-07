import { Controller, Post, Body } from '@nestjs/common';
import { RegisterUserUseCase } from '@/application/user/register-user.usecase';
import { LoginUserUseCase } from '@/application/user/login-user.usecase';
import { UserDto } from '../dto/user.dto';
import {ApiTags} from "@nestjs/swagger";

class RegisterUserRequest {
    email!: string;
    password!: string;
    name?: string;
}

class LoginUserRequest {
    email!: string;
    password!: string;
}

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(
        private readonly registerUC: RegisterUserUseCase,
        private readonly loginUC: LoginUserUseCase,
    ) {}

    @Post('register')
    async register(@Body() req: RegisterUserRequest): Promise<UserDto> {
        return this.registerUC.execute(req);
    }

    @Post('login')
    async login(@Body() req: LoginUserRequest): Promise<UserDto> {
        return this.loginUC.execute(req.email, req.password);
    }
}