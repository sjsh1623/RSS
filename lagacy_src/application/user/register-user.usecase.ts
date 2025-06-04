import {Inject, Injectable} from '@nestjs/common';
import { IUserRepository } from '@/domain/user/repositories/user.repository.interface';
import { UserDto } from '@/interfaces/dto/user.dto';
import { UserMapper } from '@/interfaces/mappers/user.mapper';
import * as bcrypt from 'bcryptjs';
import {USER_REPOSITORY} from "@/infrastructure/persistence/persistence.module";

@Injectable()
export class RegisterUserUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepo: IUserRepository
    ) {}

    async execute(input: { email: string; password: string; name?: string }): Promise<UserDto> {
        // 1) 비밀번호 해싱
        const hash = await bcrypt.hash(input.password, 10);
        // 2) 유저 생성
        const user = await this.userRepo.create({ email: input.email, passwordHash: hash, name: input.name });
        // 3) DTO 변환
        return UserMapper.toDto(user);
    }
}