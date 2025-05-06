import {Inject, Injectable} from '@nestjs/common';
import { ITokenRepository } from '@/domain/auth/repositories/token.repository.interface';
import {TOKEN_REPOSITORY} from "@/infrastructure/persistence/persistence.module";

@Injectable()
export class RevokeTokensUseCase {
    constructor(
        @Inject(TOKEN_REPOSITORY)
        private readonly tokenRepo: ITokenRepository
    ) {}

    async execute(email: string): Promise<void> {
        await this.tokenRepo.remove(email);
    }
}