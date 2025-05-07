import { User } from '@/domain/user/entities/user.entity';
import { UserDto } from '../dto/user.dto';

export class UserMapper {
    static toDto(user: User): UserDto {
        const dto = new UserDto();
        dto.id = user.id;
        dto.email = user.email;
        dto.name = user.name;
        dto.createdAt = user.createdAt;
        return dto;
    }
}