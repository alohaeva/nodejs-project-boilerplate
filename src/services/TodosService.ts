import { IRepository } from '../interfaces/repositories/IRepository.ts';
import { CreateTodo, ListTodosOptions, TodoDTO, UpdateTodo } from '../dtos/TodoDTO.ts';

export class TodosService {
  constructor(private readonly todosRepository: IRepository<TodoDTO>) {}

  async create(data: Partial<CreateTodo>): Promise<void> {
    await this.todosRepository.create(data);

    return;
  }

  async get(id: string): Promise<TodoDTO | null> {
    return this.todosRepository.getOne(id);
  }

  async list(options: ListTodosOptions): Promise<TodoDTO[]> {
    return this.todosRepository.list(options);
  }

  async delete(id: string): Promise<void> {
    return this.todosRepository.deleteOne(id);
  }

  async update(id: string, data: UpdateTodo): Promise<void> {
    return this.todosRepository.updateOne(id, data);
  }
}
