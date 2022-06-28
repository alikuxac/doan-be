import { Controller, Post, Body } from '@nestjs/common';
import { RapidapiService } from './rapidapi.service';

import { geocodeDto } from './dto/geocode.dto';
import { textSearchDto } from './dto/textSearch.dto';

@Controller('rapidapi')
export class RapidapiController {
  constructor(private readonly rapidapiService: RapidapiService) {}

  @Post('textsearch')
  async getTextSearchPlaces(@Body() dto: textSearchDto) {
    return await this.rapidapiService.getTextSearchPlaces(dto);
  }

  @Post('geocode')
  async getGeocode(@Body() dto: geocodeDto) {
    return await this.rapidapiService.getGeocode(dto);
  }
}
