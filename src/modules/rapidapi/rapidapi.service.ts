import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';

import { textSearchDto } from './dto/textSearch.dto';
import { geocodeDto } from './dto/geocode.dto';

@Injectable()
export class RapidapiService {
  private baseUrl = 'https://google-maps28.p.rapidapi.com/maps/api/';

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  private headers() {
    return {
      'X-RapidAPI-Key': this.configService.get('X_RAPIDAPI_KEY'),
      'X-RapidAPI-Host': this.configService.get('X_RAPIDAPI_HOST'),
    };
  }

  public async getTextSearchPlaces(dto: textSearchDto) {
    const url = `${this.baseUrl}place/textsearch/json`;
    const response = await this.httpService.get(url, {
      params: {
        location: dto.lat && dto.lng ? `${dto.lat},${dto.lng}` : '',
        radius: '500',
        type: 'cafe',
        opennow: dto.isOpenNow ? true : false,
        keyword: dto.keyword ? dto.keyword : '',
        language: 'vi',
      },
      headers: this.headers(),
    });

    const data = await lastValueFrom(
      response.pipe(
        map((res) => {
          return res.data.results;
        }),
      ),
    );

    return data;
  }

  public async getGeocode(dto: geocodeDto) {
    const url = `${this.baseUrl}geocode/json`;
    const response = await this.httpService.get(url, {
      params: {
        address: dto.address ? dto.address : '',
        language: 'vi',
        latlng: dto.lat && dto.lng ? `${dto.lat},${dto.lng}` : '',
      },
      headers: this.headers(),
    });

    const data = await lastValueFrom(
      response.pipe(
        map((res) => {
          return res.data.results;
        }),
      ),
    );

    return data;
  }
}
