import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RedisModule } from 'src/redis.module';
import { DatabaseModule } from 'src/database.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [RedisModule, DatabaseModule],
})
export class AuthModule {}
