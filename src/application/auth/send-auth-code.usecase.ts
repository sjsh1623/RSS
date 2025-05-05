import {Inject} from '@nestjs/common';
import {IAuthCodeRepository} from '@/domain/auth/repositories/auth-code.repository.interface';
import {AuthCode} from '@/domain/auth/entities/auth-code.entity';
import {MailService} from '@/shared/mail.service';
import {AUTH_CODE_REPOSITORY} from "@/infrastructure/persistence/persistence.module";

export class SendAuthCodeUseCase {
    constructor(
        @Inject(AUTH_CODE_REPOSITORY)
        private readonly repo: IAuthCodeRepository,
        private readonly mailService: MailService,
    ) {
    }

    async execute(email: string): Promise<void> {
        const code = Math.random().toString().slice(2, 8);
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5분
        const authCode = new AuthCode(email, code, expiresAt);
        await this.repo.save(authCode);
        await this.mailService.sendMail({
            to: email,
            subject: '[Planiary] 인증 코드 안내',
            text: `인증 코드: ${code} (5분간 유효)`,
        });
    }
}