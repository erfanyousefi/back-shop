import { RedisService as RedisCoreService } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private cacheManager: Redis
  constructor(private redisService: RedisCoreService) {
    this.cacheManager = this.redisService.getClient()
  }
  async setKeyNoExpire(key: string, value: string) {
    await this.cacheManager.set(key, value, 'NX')
  }
  async setKey(key: string, value: string, ttl?: number) {
    await this.cacheManager.set(key, value, 'EX', ttl);
  }
  async getKey(key: string): Promise<any> {
    const result = await this.cacheManager.get(key);
    return result
  }
  async deleteValue(key: string): Promise<boolean> {
    return !!(await this.cacheManager.del(key));
  }
}
