import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailTemplate } from './mail.template';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [MailService, MailTemplate],
  exports: [MailService],
})
export class MailModule {}
