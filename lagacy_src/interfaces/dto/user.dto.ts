import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty({ description: '고유 식별자', example: 1 })
    id!: number;

    @ApiProperty({ description: '사용자 이메일 주소', example: 'user@example.com' })
    email!: string;

    @ApiProperty({ description: '사용자 이름', example: '홍길동', nullable: true })
    name!: string | null;

    @ApiProperty({ description: '계정 생성 일시', example: '2025-05-06T12:00:00.000Z' })
    createdAt!: Date;
}