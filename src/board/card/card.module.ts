import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { RedisModule } from 'src/redis.module';
import { DatabaseModule } from 'src/database.module';

@Module({
  controllers: [CardController],
  providers: [CardService],
  imports: [DatabaseModule]
})
export class CardModule {}
