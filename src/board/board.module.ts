import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { DatabaseModule } from 'src/database.module';
import { CardModule } from './card/card.module';
import { ColumnModule } from './column/column.module';
import { IsLoggedInMiddleware } from 'src/is-logged-in.middleware';
import { RedisModule } from 'src/redis.module';
import { RouterModule } from '@nestjs/core';
import { ColumnCardModule } from './column/column-card/column-card.module';

@Module({
  controllers: [BoardController],
  providers: [BoardService],
  imports: [
    DatabaseModule,
    RedisModule,
     CardModule, ColumnModule
  ],
})
export class BoardModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IsLoggedInMiddleware)
      .forRoutes(
        { path: '/boards*', method: RequestMethod.DELETE },
        { path: '/boards*', method: RequestMethod.POST },
        { path: '/boards*', method: RequestMethod.PATCH },
      );
  }
}
