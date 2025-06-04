import { AuthCode } from '../entities/auth-code.entity';

export interface IAuthCodeRepository {
    save(code: AuthCode): Promise<void>;
    find(email: string): Promise<AuthCode | null>;
    remove(email: string): Promise<void>;
}