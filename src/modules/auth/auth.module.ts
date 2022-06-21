import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { MailModule } from '../mail/mail.module';
import { SharedModule } from '../shared/shared.module';
@Module({
  imports: [
    JwtModule.register({ secret: 'secret' }),
    TypeOrmModule.forFeature([User]),
    MailModule,
    SharedModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
