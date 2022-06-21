import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteFavoriteDto {
  @IsNumber()
  @ApiProperty()
  timestammp: number;
}
