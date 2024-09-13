import { Module } from '@nestjs/common';
import { Keyv } from 'keyv';
import KeyvSqlite from '@keyv/sqlite';
import { CacheService } from './cache.service';
import { ConfigService } from '../../config/config.service';

@Module({
  providers: [
    {
      provide: 'KEYV_INSTANCE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        new Keyv({ store: new KeyvSqlite(configService.cachePath) }),
    },
    CacheService,
  ],
  exports: ['KEYV_INSTANCE', CacheService],
})
export class CacheModule {}
