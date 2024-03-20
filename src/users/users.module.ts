import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database.module';
import { IsLoggedInMiddleware } from 'src/is-logged-in.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [DatabaseModule],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(IsLoggedInMiddleware).forRoutes({path: '/users*', method: RequestMethod.ALL})
  }
}
