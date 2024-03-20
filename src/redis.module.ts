import { Module } from '@nestjs/common';
import RedisClient from '@redis/client/dist/lib/client';
import {
  RedisClientType,
  RedisFunctions,
  RedisModules,
  RedisScripts,
  createClient,
} from 'redis';

@Module({
  providers: [
    {
      provide: 'REDIS_CONNECTION',
      useFactory: async (): Promise<
        RedisClientType<RedisModules, RedisFunctions, RedisScripts>
      > => {
        const redis = createClient({
          password: process.env.REDIS_PASSWORD || '',
          socket: {
            host: process.env.REDIS_HOST || 'localhost',
            port: Number(process.env.REDIS_PORT) || 6379,
          }
        });
        return await redis.connect();
      },
    },
  ],
  exports: ['REDIS_CONNECTION'],
})
export class RedisModule {}
