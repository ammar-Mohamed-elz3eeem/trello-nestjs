import { Module } from '@nestjs/common';
import { ColumnCardService } from './column-card.service';
import { ColumnCardController } from './column-card.controller';
import { DatabaseModule } from 'src/database.module';
import { RedisModule } from 'src/redis.module';

@Module({
  controllers: [ColumnCardController],
  providers: [ColumnCardService],
  imports: [DatabaseModule]
})
export class ColumnCardModule {}
