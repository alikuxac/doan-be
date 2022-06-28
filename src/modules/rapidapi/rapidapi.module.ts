import { Module } from '@nestjs/common';
import { RapidapiService } from './rapidapi.service';
import { RapidapiController } from './rapidapi.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [RapidapiController],
  providers: [RapidapiService],
})
export class RapidapiModule {}
