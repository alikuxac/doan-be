import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailTemplate } from './mail.template';
import { customAlphabet } from 'nanoid';
import nodemailer, { Transporter } from 'nodemailer';
import { RedisService } from '../shared/redis.service';

const nanoid = customAlphabet(
  '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  10,
);
@Injectable()
export class MailService {
  public transporter: Transporter;

  constructor(
    private readonly configService: ConfigService,
    public readonly mailTemplate: MailTemplate,
    private readonly redisService: RedisService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('MAIL_HOST'),
      port: this.configService.get('MAIL_PORT'),
      // secure: this.configService.get('MAIL_SECURE'),
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASSWORD'),
      },
      tls: { ciphers: this.configService.get('MAIL_TTL') },
    });
  }

  async sendResetPassword(email: string) {
    const passcode = nanoid();
    await this.redisService.setPasscode(email, passcode);
    return this.transporter.sendMail({
      from: this.configService.get('MAIL_FROM'),
      to: email,
      subject: 'Reset Password',
      html: this.mailTemplate.resetPassword(email, passcode),
    });
  }
}
