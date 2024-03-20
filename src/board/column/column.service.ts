import { Inject, Injectable } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Db, ObjectId } from 'mongodb';
import { RedisClientType } from '@redis/client';

@Injectable()
export class ColumnService {
  constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}
  async create(slug: string, { boardName, dateCreated, columnName, userId, sequence }: CreateColumnDto) {
    const data = {
      boardId: new ObjectId(slug),
      boardName,
      columnName,
      dateCreated,
      userId: new ObjectId(userId as string),
      sequence
    };

    try {
      const board = await this.db.collection('columns').insertOne(data);
      return board;
    } catch (error) {
      throw error;
    }
  }

  async get(slug: string) {
    try {
      const columns = await this.db
        .collection('columns')
        .find({ boardId: new ObjectId(slug) })
        .toArray();

      return columns;
    } catch (error) {
      throw error;
    }
  }

  async update(cid: string, updateColumnDto: UpdateColumnDto) {
    try {
      const board = await this.db
        .collection('columns')
        .updateOne({ _id: new ObjectId(cid) }, { $set: { ...updateColumnDto } });

      return board;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await this.db.collection('cards').deleteMany({ columnId: new ObjectId(id) });
      await this.db.collection('columns').deleteOne({ _id: new ObjectId(id) });
      return 'All Columns & Cards Associated with them have been deleted'
    } catch (error) {
      throw error;
    }
  }
}
