import { Inject, Injectable } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

  async findOne(id: string) {
    const user = await this.db
      .collection('users')
      .findOne({ _id: new ObjectId(id) });
    return user;
  }
}
