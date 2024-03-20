import { Module } from '@nestjs/common';
import RedisClient from '@redis/client/dist/lib/client';
import {
  RedisClientType,
  RedisFunctions,
  RedisModules,
  RedisScripts,
} from 'redis';

@Module({
  providers: [
    {
      provide: 'REDIS_CONNECTION',
      useFactory: async (): Promise<
        RedisClientType<RedisModules, RedisFunctions, RedisScripts>
      > => {
        const redis = new RedisClient({
          url: process.env.REDIS_URL || 'localhost:6379',
          username: process.env.REDIS_USERNAME || 'default',
          password: process.env.REDIS_PASSWORD || '',
        });
        return await redis.connect();
      },
    },
  ],
  exports: ['REDIS_CONNECTION'],
})
export class RedisModule {}
