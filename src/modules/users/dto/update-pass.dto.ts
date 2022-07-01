import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePassDto {
  @IsEmail()
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  newPassword: string;
}
