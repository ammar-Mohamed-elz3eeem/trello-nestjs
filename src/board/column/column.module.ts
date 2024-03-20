import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { ColumnCardModule } from './column-card/column-card.module';
import { DatabaseModule } from 'src/database.module';
import { RedisModule } from 'src/redis.module';

@Module({
  controllers: [ColumnController],
  providers: [ColumnService],
  imports: [ColumnCardModule, DatabaseModule],
})
export class ColumnModule {}
