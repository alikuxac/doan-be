import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginPayload } from './login.payload';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import {
  ResetPasswordConfirmDto,
  ResetPasswordDto,
} from './dto/reset-pass.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() payload: LoginPayload): Promise<any> {
    const user = await this.authService.validateUser(payload);
    return await this.authService.createToken(user);
  }

  @Post('register')
  async register(@Body() payload: CreateUserDto): Promise<any> {
    const user = await this.usersService.create(payload);
    return await this.authService.createToken(user);
  }

  @Post('resetpass')
  async resetpass(@Body() payload: ResetPasswordDto) {
    return await this.authService.resetPass(payload.email);
  }

  @Post('resetpass/confirm')
  async resetpassConfirm(@Body() payload: ResetPasswordConfirmDto) {
    return await this.authService.resetPassConfirm(
      payload.email,
      payload.passcode,
      payload.password,
    );
  }
}
