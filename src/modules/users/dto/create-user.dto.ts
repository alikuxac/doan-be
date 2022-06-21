import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsMobilePhone,
  IsEnum,
  MinLength,
  IsOptional,
  MaxLength,
  IsUrl,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { UserRole } from '../enum/role.enum';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  password: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  fullname?: string;

  @IsMobilePhone()
  @ApiPropertyOptional()
  @IsOptional()
  phone?: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  address?: string;

  @IsUrl()
  @ApiPropertyOptional()
  @IsOptional()
  avatar?: string;

  @IsOptional()
  @ApiPropertyOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
