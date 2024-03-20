import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { RouterModule } from '@nestjs/core';
import { ColumnModule } from './board/column/column.module';
import { ColumnCardModule } from './board/column/column-card/column-card.module';
import { CardModule } from './board/card/card.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UsersModule, AuthModule, BoardModule, RouterModule.register([
      {
        path: '/boards',
        module: BoardModule,
        children: [
          {
            path: '/:slug/columns',
            module: ColumnModule,
            children: [
              {
                path: '/:cid/cards',
                module: ColumnCardModule
              }
            ]
          },
          {
            path: '/:slug/cards',
            module: CardModule
          }
        ]
      },
    ]),],
})
export class AppModule {}
