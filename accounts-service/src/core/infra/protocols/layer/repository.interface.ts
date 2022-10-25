export interface IRepository<Entity> {
  findById(entityId: string): Promise<Entity | null>;
  exists(entityId: string): Promise<boolean>;
  save(entity: Entity): Promise<void>;
}
