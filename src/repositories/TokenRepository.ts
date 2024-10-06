import { IDBConnector } from '../interfaces/connectors/IDBConnector.ts';
import { IRepository } from '../interfaces/repositories/IRepository.ts';
import { IMongoDBConnection } from '../connectors/mongo/index.ts';
import { TokenDTO, tokenDTOSchema, UpdateToken } from '../dtos/TokenDTO.ts';
import TokenSchema from '../schemas/TokenSchema.ts';

const MODEL_STRING = 'tokens';

export class TokenRepository implements IRepository<TokenDTO> {
  constructor(private readonly dbConnector: IDBConnector<IMongoDBConnection>) {
    this.dbConnector.connection.registerSchema(MODEL_STRING, TokenSchema);
  }

  async create(data: unknown): Promise<Pick<TokenDTO, 'id'>> {
    const model = this.dbConnector.connection.getModel(MODEL_STRING);

    const [newToken] = await model.create([data]);

    const token = tokenDTOSchema.parse(newToken);

    return {
      id: token.id,
    };
  }

  async list(): Promise<TokenDTO[]> {
    const model = this.dbConnector.connection.getModel(MODEL_STRING);

    const tokens = await model.find();

    return tokens.map(token => tokenDTOSchema.parse(token));
  }

  async getOne(id: string): Promise<TokenDTO | null> {
    const model = this.dbConnector.connection.getModel(MODEL_STRING);

    const item = await model.findOne({
      _id: id,
    });

    if (!item) {
      return null;
    }

    return tokenDTOSchema.parse(item);
  }

  async deleteOne(id: string): Promise<void> {
    const model = this.dbConnector.connection.getModel(MODEL_STRING);

    await model.deleteOne({
      _id: id,
    });
  }

  async updateOne(id: string, updateData: UpdateToken): Promise<void> {
    const model = this.dbConnector.connection.getModel(MODEL_STRING);

    await model.updateOne(
      {
        _id: id,
      },
      updateData
    );
  }
}
