import { Injectable } from '@nestjs/common';
import { ITokenRepository } from '../../domain/auth/repositories/token.repository.interface';

@Injectable()
export class RevokeTokensUseCase {
    constructor(private readonly tokenRepo: ITokenRepository) {}

    async execute(email: string): Promise<void> {
        await this.tokenRepo.remove(email);
    }
}