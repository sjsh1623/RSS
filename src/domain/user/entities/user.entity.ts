export class User {
    constructor(
        public readonly id: number,
        public readonly email: string,
        public readonly passwordHash: string,
        public readonly name: string | null,
        public readonly createdAt: Date,
    ) {}
}