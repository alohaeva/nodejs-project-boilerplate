import { IDBConnector } from '../interfaces/connectors/IDBConnector.ts';
import { IRepository } from '../interfaces/repositories/IRepository.ts';
import { CreateTodoEntity, TodoEntity, todoEntitySchema, UpdateTodoEntity } from '../entities/TodoEntity.ts';
import { IMongoDBConnection } from '../connectors/mongo/index.ts';
import TodoSchema from '../schemas/TodoSchema.ts';

export class TodosRepository implements IRepository<TodoEntity> {
  constructor(private readonly dbConnector: IDBConnector<IMongoDBConnection>) {
    this.dbConnector.connection.registerSchema('todos', TodoSchema);
  }

  async create(data: CreateTodoEntity): Promise<void> {
    const model = this.dbConnector.connection.getModel('todos');

    await model.create([data]);

    return;
  }

  async list(): Promise<TodoEntity[]> {
    const model = this.dbConnector.connection.getModel('todos');

    const items = await model.find();

    return items.map(item => todoEntitySchema.parse(item));
  }

  async getOne(id: string): Promise<TodoEntity | null> {
    const model = this.dbConnector.connection.getModel('todos');

    const item = await model.findOne({
      _id: id,
    });

    if (!item) {
      return null;
    }

    return todoEntitySchema.parse(item);
  }

  async deleteOne(id: string): Promise<void> {
    const model = this.dbConnector.connection.getModel('todos');

    await model.deleteOne({
      _id: id,
    });
  }

  async updateOne(id: string, updateData: UpdateTodoEntity): Promise<void> {
    const model = this.dbConnector.connection.getModel('todos');

    await model.updateOne(
      {
        _id: id,
      },
      updateData
    );
  }
}
