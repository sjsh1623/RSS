import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private readonly mailer: MailerService) {}

    sendMail(options: { to: string; subject: string; text: string }) {
        return this.mailer.sendMail(options);
    }
}