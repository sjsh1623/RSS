export class AuthCode {
    constructor(
        public readonly email: string,
        public readonly code: string,
        public readonly expiresAt: Date,
    ) {}

    isExpired(now = new Date()): boolean {
        return now > this.expiresAt;
    }
}