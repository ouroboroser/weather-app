import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { WeatherAPIService } from './weather-api.service';

@Module({
  providers: [WeatherAPIService],
  exports: [WeatherAPIService],
  imports: [HttpModule.register({})],
})
export class HttpRequesterModule {}
