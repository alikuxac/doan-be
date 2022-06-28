import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class textSearchDto {
  @IsString()
  @ApiProperty()
  keyword: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  lat?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  lng?: number;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  isOpenNow?: boolean;
}
