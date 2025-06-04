// src/shared/mail/mail.module.ts

import { Module } from '@nestjs/common';
import {MailService} from "@/shared/mail.service";


@Module({
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}