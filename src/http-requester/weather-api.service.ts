import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import Big from 'big.js';
import { ConfigService } from '../config/config.service';
import { WeatherResponseDto } from '../../src/api/weather/dto/weather-response.dto';

@Injectable()
export class WeatherAPIService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getWeather(city: string, date: string): Promise<WeatherResponseDto> {
    const data = await this.httpService.axiosRef
      .post(`${this.configService.externalApi}/weather`, {
        city,
        date,
      })
      .then((response) => response.data)
      .catch(() => {
        throw new BadRequestException('Service is offline, retry later');
      });

    return {
      celcius: data?.celcius ?? this.farenheitTocelcius(data.fahrenheit),
      fahrenheit: data?.fahrenheit ?? this.celciusToFarenheit(data.celcius),
    };
  }

  private celciusToFarenheit = (celcius: number) => {
    return new Big(celcius).mul(9).div(5).plus(32).toNumber();
  };

  private farenheitTocelcius = (farenheit: number) => {
    const operation1 = new Big(farenheit).minus(32);
    return operation1.mul(5).div(9).toNumber();
  };
}
