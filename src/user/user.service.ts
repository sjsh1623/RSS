import {Injectable} from '@nestjs/common';
import {UserRepository} from './user.repository';
import * as bcrypt from 'bcrypt';
import {user} from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {
    }

    async createUser(email: string, password: string, name?: string): Promise<user> {
        if (!name) {
            throw new Error('Name is required');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.userRepository.create({email, password: hashedPassword, name});
    }

    async findByEmail(email: string): Promise<user | null> {
        return this.userRepository.findByEmail(email);
    }

    async findById(id: number): Promise<user | null> {
        return this.userRepository.findById(id);
    }
}