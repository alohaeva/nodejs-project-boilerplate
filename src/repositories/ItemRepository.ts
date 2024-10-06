import { IDBConnector } from '../interfaces/connectors/IDBConnector.ts';
import { IRepository } from '../interfaces/repositories/IRepository.ts';
import { CreateTodo, ListTodosOptions, TodoDTO, todoDTOSchema, UpdateTodo } from '../dtos/TodoDTO.ts';
import { IMongoDBConnection } from '../connectors/mongo/index.ts';
import TodoSchema from '../schemas/TodoSchema.ts';

const MODEL_STRING = 'todos';

export class TodosRepository implements IRepository<TodoDTO> {
  constructor(private readonly dbConnector: IDBConnector<IMongoDBConnection>) {
    this.dbConnector.connection.registerSchema(MODEL_STRING, TodoSchema);
  }

  async create(data: CreateTodo): Promise<Pick<TodoDTO, 'id'>> {
    const model = this.dbConnector.connection.getModel(MODEL_STRING);

    const [newTodo] = await model.create([data]);

    const todo = todoDTOSchema.parse(newTodo);

    return {
      id: todo.id,
    };
  }

  async list(options: ListTodosOptions): Promise<TodoDTO[]> {
    const model = this.dbConnector.connection.getModel(MODEL_STRING);

    const items = await model.find(
      {},
      {},
      {
        skip: options.offset,
        limit: options.limit,
      }
    );

    return items.map(item => todoDTOSchema.parse(item));
  }

  async getOne(id: string): Promise<TodoDTO | null> {
    const model = this.dbConnector.connection.getModel(MODEL_STRING);

    const item = await model.findOne({
      _id: id,
    });

    if (!item) {
      return null;
    }

    return todoDTOSchema.parse(item);
  }

  async deleteOne(id: string): Promise<void> {
    const model = this.dbConnector.connection.getModel(MODEL_STRING);

    await model.deleteOne({
      _id: id,
    });
  }

  async updateOne(id: string, updateData: UpdateTodo): Promise<void> {
    const model = this.dbConnector.connection.getModel(MODEL_STRING);

    await model.updateOne(
      {
        _id: id,
      },
      updateData
    );
  }
}
