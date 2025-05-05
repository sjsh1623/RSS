export interface ITokenRepository {
    save(email: string, refreshToken: string, expiresAt: Date): Promise<void>;
    find(email: string): Promise<string | null>;
    remove(email: string): Promise<void>;
}