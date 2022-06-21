import { Injectable } from '@nestjs/common';

@Injectable()
export class MailTemplate {
  public resetPassword = (email: string, passcode: string) => {
    return `
        <h1>Reset Password</h1>
        <p>Hello ${email}</p>
        <p>This is passcode validation: <b>${passcode}</b></p>
    `;
  };
}
