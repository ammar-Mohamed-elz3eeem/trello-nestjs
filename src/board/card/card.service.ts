import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { Db, ObjectId } from 'mongodb';

@Injectable()
export class CardService {
  constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}
  async findAllByBoardId(boardSlug: string) {
    try {
      const cards = await this.db
      .collection('cards')
      .find({ boardId: new ObjectId(boardSlug) })
      .toArray();

      return cards;
    } catch (error) {
      throw error;
    }
  }

  async DeleteAllByBoardId(boardSlug: string) {
    try {
      const removedCards = await this.db.collection('cards').deleteMany({ boardId: new ObjectId(boardSlug) });
      return removedCards;
    } catch (error) {
      throw error;
    }
  }

  async update(slug: string, id: string, updateCardDto: any) {
    try {
      const updatedRes = await this.db
        .collection('cards')
        .updateOne(
          { _id: new ObjectId(id), boardId: new ObjectId(slug) },
          { $set: { ...updateCardDto } }
        );

      return updatedRes;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const deletedCard = await this.db.collection('cards').deleteOne({ _id: new ObjectId(id) });
    } catch (error) {
      throw error;
    }
  }
}
