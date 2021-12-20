import { MongoClient } from 'mongodb';

export const MongoHelper = {
  client: null as unknown as MongoClient,

  async connect(url: string): Promise<void> {
    this.client = await MongoClient.connect(global.__MONGO_URI__);
  },

  async disconnect(): Promise<void> {
    this.client.close();
  }
};
