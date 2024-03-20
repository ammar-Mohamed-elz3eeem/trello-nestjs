import { Inject, Injectable } from '@nestjs/common';
import { CreateColumnCardDto } from './dto/create-column-card.dto';
import { Db, ObjectId } from 'mongodb';

@Injectable()
export class ColumnCardService {
  constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

  async create(slug: string, columnId: string, createColumnCardDto: CreateColumnCardDto) {
    const { userId, dateCreated, title, type, description, sequence } = createColumnCardDto;

    const data = {
      boardId: new ObjectId(slug),
      columnId: new ObjectId(columnId as string),
      title,
      type,
      dateCreated,
      userId: new ObjectId(userId as string),
      sequence,
      description
    };

    try {
      const card = await this.db.collection('cards').insertOne(data);
      return card;
    } catch (error) {
      throw error;
    }

  }

  async findAll(slug: string) {
    try {
      const cards = await this.db
        .collection('cards')
        .find({ boardId: new ObjectId(slug) })
        .toArray();
      return cards;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string, columnId: string) {
    try {
      return await this.db
        .collection('cards')
        .deleteOne({ _id: new ObjectId(id), columnId: new ObjectId(columnId) });
    } catch (error) {
      throw error;
    }
  }
}
