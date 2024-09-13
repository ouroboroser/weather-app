import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { WeatherModule } from './api/weather/weather.module';
import { CacheModule } from './core/cache/cache.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigService } from './config/config.service';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: ({ requestTTL, requestLimit }: ConfigService) => [
        {
          ttl: requestTTL,
          limit: requestLimit,
        },
      ],
    }),
    { module: ConfigModule, global: true },
    CacheModule,
    WeatherModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
