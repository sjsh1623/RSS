import {Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import {IUserRepository} from '@/domain/user/repositories/user.repository.interface';
import {UserDto} from '@/interfaces/dto/user.dto';
import {UserMapper} from '@/interfaces/mappers/user.mapper';
import * as bcrypt from 'bcryptjs';
import {USER_REPOSITORY} from "@/infrastructure/persistence/persistence.module";

@Injectable()
export class LoginUserUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepo: IUserRepository
    ) {
    }

    async execute(email: string, password: string): Promise<UserDto> {
        const user = await this.userRepo.findByEmail(email);
        if (!user) throw new UnauthorizedException('잘못된 이메일 또는 비밀번호입니다.');
        const match = await bcrypt.compare(password, user.passwordHash);
        if (!match) throw new UnauthorizedException('잘못된 이메일 또는 비밀번호입니다.');
        return UserMapper.toDto(user);
    }
}