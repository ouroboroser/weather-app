import { Inject, Injectable } from '@nestjs/common';
import { Keyv } from 'keyv';

@Injectable()
export class CacheService {
  constructor(@Inject('KEYV_INSTANCE') private readonly keyv: Keyv) {}

  async get<T>(key: string): Promise<T> {
    const res = await this.keyv.get(key);
    return res ? JSON.parse(res as string) : res;
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    await this.keyv.set(key, value, ttl);
  }

  async delete(key: string): Promise<void> {
    await this.keyv.delete(key);
  }
}
