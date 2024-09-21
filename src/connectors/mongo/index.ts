import mongoose, { Mongoose } from 'mongoose';

type MongoDbConnectionOptions = {
  uri: string;
};

export interface IMongoDBConnection {
  readonly client: Mongoose | null;

  getModel<ModelType>(modelString: string): mongoose.Model<ModelType>;
  getClient(): Mongoose | null;
  registerSchema<ModelType>(modelName: string, model: mongoose.Schema<ModelType>): void;
}

class MongoDBConnection implements IMongoDBConnection {
  client: Mongoose | null;

  constructor() {
    this.client = null;
  }

  async connect(opts: MongoDbConnectionOptions): Promise<Mongoose | null> {
    if (!(this.client instanceof Mongoose)) {
      this.client = await mongoose.connect(opts.uri);
    }

    return this.client;
  }

  getModel<ModelType>(modelString: string) {
    return mongoose.model<ModelType>(modelString);
  }

  getClient(): Mongoose | null {
    return this.client;
  }

  registerSchema<ModelType>(modelName: string, model: mongoose.Schema<ModelType>) {
    mongoose.model<ModelType>(modelName, model);
  }
}

export default new MongoDBConnection();
