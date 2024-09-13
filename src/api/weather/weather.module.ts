import { Module } from '@nestjs/common';

import { WeatherController } from './weather.controller';
import { HttpRequesterModule } from '../../http-requester/http-requester.module';
import { CacheModule } from '../../core/cache/cache.module';
import { WeatherService } from './weather.service';

@Module({
  imports: [HttpRequesterModule, CacheModule],
  providers: [WeatherService],
  controllers: [WeatherController],
})
export class WeatherModule {}
