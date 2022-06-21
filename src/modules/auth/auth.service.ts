import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginPayload } from './login.payload';

import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

import { MailService } from '../mail/mail.service';
import { RedisService } from '../shared/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    private readonly mailService: MailService,
    private readonly redisService: RedisService,
  ) {}

  async createToken(user: User) {
    delete user.password;
    return {
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
      accessToken: this.jwtService.sign(
        { id: user.id },
        {
          expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
        },
      ),
      user,
    };
  }

  async validateUser(payload: LoginPayload): Promise<any> {
    const user = await this.userService.findOneByEmail(payload.email);

    if (!user) {
      throw new UnauthorizedException('Invalid user!');
    }

    if (!user.comparePassword(payload.password)) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    return user;
  }

  async resetPass(email: string) {
    return await this.mailService.sendResetPassword(email);
  }

  async resetPassConfirm(email: string, passcode: string, password: string) {
    const passcodeRedis = await this.redisService.getPasscode(email);
    if (!passcodeRedis || passcodeRedis !== passcode) {
      throw new UnauthorizedException('Invalid email or passcode!');
    }
    await this.redisService.deletePasscode(passcode);
    return await this.userService.updatePassword(email, password);
  }
}
