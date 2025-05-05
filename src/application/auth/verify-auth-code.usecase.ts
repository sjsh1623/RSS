import { Injectable, BadRequestException } from '@nestjs/common';
import { IAuthCodeRepository } from '../../domain/auth/repositories/auth-code.repository.interface';

@Injectable()
export class VerifyAuthCodeUseCase {
    constructor(private readonly repo: IAuthCodeRepository) {}

    async execute(email: string, code: string): Promise<void> {
        const record = await this.repo.find(email);
        if (!record || record.code !== code) {
            throw new BadRequestException('올바르지 않은 인증 코드입니다.');
        }
        if (record.isExpired()) {
            await this.repo.remove(email);
            throw new BadRequestException('인증 코드가 만료되었습니다.');
        }
        await this.repo.remove(email);
    }
}