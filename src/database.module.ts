import { Module } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<Db> => {
      try {
        const client = await MongoClient.connect(process.env.MONGODB_URL);
        return client.db(process.env.MONGODB_DATABASE);
      } catch (error) {
        throw error;
      }
    },
  },
];

@Module({
  providers: [...databaseProviders],
  exports: ['DATABASE_CONNECTION'],
})
export class DatabaseModule {}
