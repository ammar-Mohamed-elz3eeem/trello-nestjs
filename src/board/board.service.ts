import { Inject, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Db, ObjectId } from 'mongodb';
import { RedisClientType } from 'redis';

@Injectable()
export class BoardService {
  constructor(
    @Inject('DATABASE_CONNECTION') private db: Db,
    @Inject('REDIS_CONNECTION') private redis: RedisClientType,
  ) {}
  async getBoardsByUserId(authKey: string) {
    try {
      const userId = JSON.parse(await this.redis.get(authKey)).id;
      const boards = await this.db
        .collection('boards')
        .find({ createdBy: userId })
        .limit(30)
        .toArray();
      const invitedBoards = await this.db
        .collection('boards')
        .find({ users: userId })
        .toArray();

      const updatedBoards = boards.concat(invitedBoards);

      return updatedBoards;
    } catch (error) {
      throw error;
    }
  }

  async getBoardById(id: string | number) {
    try {
      const board = await this.db
        .collection('boards')
        .findOne({ _id: new ObjectId(id) });
      return board;
    } catch (error) {
      throw error;
    }
  }

  async createBoard({
    name,
    createdBy,
    dateCreated,
    backgroundImage,
  }: CreateBoardDto) {
    const data = {
      name,
      createdBy,
      dateCreated,
      backgroundImage,
      users: [],
    };

    try {
      const board = await this.db.collection('boards').insertOne(data);
      return board;
    } catch (error) {
      throw error;
    }
  }

  async updateBoard(
    id: string | number,
    data: UpdateBoardDto,
  ) {
    try {
      const board = await this.db
        .collection('boards')
        .updateOne({ _id: new ObjectId(id) }, { $set: data });

      return board;
    } catch (error) {
      throw error;
    }
  }

  async deleteBoard(id: string | number) {
    try {
      await this.db
        .collection('cards')
        .deleteMany({ boardId: new ObjectId(id) });
      await this.db
        .collection('columns')
        .deleteMany({ boardId: new ObjectId(id) });
      await this.db.collection('boards').deleteOne({ _id: new ObjectId(id) });

      return 'Delete boards with columns and cards';
    } catch (error) {
      throw error;
    }
  }
}
