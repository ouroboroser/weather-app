import { Injectable } from '@nestjs/common';
import { CacheService } from '../../core/cache/cache.service';
import { WeatherRequestDto } from './dto/weather-request.dto';
import { WeatherResponseDto } from './dto/weather-response.dto';
import { WeatherAPIService } from '../../http-requester/weather-api.service';

@Injectable()
export class WeatherService {
  constructor(
    private readonly weatherAPIService: WeatherAPIService,
    private readonly cache: CacheService,
  ) {}

  async getWeather(body: WeatherRequestDto): Promise<WeatherResponseDto> {
    const { city, date } = body;

    const key = this.createKey(city, date);

    const cache = await this.cache.get<WeatherResponseDto>(key);

    if (!cache) {
      const data = await this.weatherAPIService.getWeather(city, date);
      await this.cache.set(key, JSON.stringify(data), this.getTTL());
      return data;
    }

    return cache;
  }

  private createKey(city: string, inputDate: string): string {
    const date = new Date(inputDate);

    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return city.toLowerCase() + date.getTime();
  }

  private getTTL(): number {
    const now: Date = new Date();
    const nextHour: Date = new Date(now);

    nextHour.setHours(now.getHours() + 1, 0, 0, 0);

    return nextHour.getTime() - now.getTime();
  }
}
