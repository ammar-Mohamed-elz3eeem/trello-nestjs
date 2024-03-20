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
        const redis = new RedisClient({});
        return await redis.connect();
      },
    },
  ],
  exports: ['REDIS_CONNECTION'],
})
export class RedisModule {}
