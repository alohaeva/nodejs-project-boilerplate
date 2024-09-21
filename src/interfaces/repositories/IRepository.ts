export interface IRepository<Entity extends { id: string }> {
  create(data: Partial<Entity>): Promise<void>;
  getOne(id: string): Promise<Entity | null>;
  deleteOne(id: string): Promise<void>;
  updateOne(id: string, data: Partial<Entity>): Promise<void>;
  list(): Promise<Entity[]>;
}
