import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name);

    private readonly transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT ?? '465', 10),
        secure: true, // 465 포트는 secure true 필요
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    async sendEmailVerification(to: string, code: string): Promise<void> {
        const subject = '[RSS] 이메일 인증 코드';
        const html = `<p>인증 코드: <strong>${code}</strong></p>`;

        const mailOptions = {
            from: `"RSS Service" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            this.logger.log(`✅ 이메일 전송 완료 → ${to}`);
        } catch (error) {
            this.logger.error(`❌ 이메일 전송 실패: ${error.message}`);
            throw new InternalServerErrorException('이메일 전송에 실패했습니다');
        }
    }
}