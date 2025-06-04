// src/shared/mail/mail.service.ts
import {Injectable} from '@nestjs/common';

/**
 * MailService stub – no external deps.
 * Replace this with real SMTP logic later.
 */
@Injectable()
export class MailService {
    async sendMail(options: {
        to: string;
        subject: string;
        content: string;
        html?: string;
    }): Promise<void> {
        // TODO: 실제 메일 전송 로직 구현 전, 임시로 로깅만 합니다.
        console.log(`[MailService] sendMail → to=${options.to}, subject=${options.subject}`);
    }
}