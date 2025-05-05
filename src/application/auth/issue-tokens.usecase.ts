import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ITokenRepository } from '../../domain/auth/repositories/token.repository.interface';
import { TokenPair } from '../../domain/auth/entities/token.entity';

@Injectable()
export class IssueTokensUseCase {
    constructor(
        private readonly jwtService: JwtService,
        private readonly tokenRepo: ITokenRepository,
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