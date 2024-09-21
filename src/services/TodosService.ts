import { IRepository } from '../interfaces/repositories/IRepository.ts';
import { CreateTodoEntity, TodoEntity, UpdateTodoEntity } from '../entities/TodoEntity.ts';

export class TodosService {
  constructor(private readonly itemsRepository: IRepository<TodoEntity>) {}

  async create(data: Partial<CreateTodoEntity>): Promise<void> {
    await this.itemsRepository.create(data);

    return;
  }

  async get(id: string): Promise<TodoEntity | null> {
    return this.itemsRepository.getOne(id);
  }

  async list(): Promise<TodoEntity[]> {
    return this.itemsRepository.list();
  }

  async delete(id: string): Promise<void> {
    return this.itemsRepository.deleteOne(id);
  }

  async update(id: string, data: UpdateTodoEntity): Promise<void> {
    return this.itemsRepository.updateOne(id, data);
  }
}
