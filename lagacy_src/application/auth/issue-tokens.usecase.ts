import {Inject, Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ITokenRepository } from '@/domain/auth/repositories/token.repository.interface';
import { TokenPair } from '@/domain/auth/entities/token.entity';
import {TOKEN_REPOSITORY} from "@/infrastructure/persistence/persistence.module";

@Injectable()
export class IssueTokensUseCase {
    constructor(
        @Inject(TOKEN_REPOSITORY)
        private readonly tokenRepo: ITokenRepository,
        private readonly jwtService: JwtService,
    ) {}

    async execute(email: string): Promise<TokenPair> {
        const payload = { sub: email };
        const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
        const decoded = this.jwtService.decode(refreshToken) as { exp: number };
        await this.tokenRepo.save(email, refreshToken, new Date(decoded.exp * 1000));
        return new TokenPair(accessToken, refreshToken);
    }
}