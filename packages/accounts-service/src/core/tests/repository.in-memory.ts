/* eslint-disable @typescript-eslint/ban-ts-comment */
import { IRepository } from '@core/infra/protocols/layer/repository.interface';

abstract class RepositoryInMemory<Entity> implements IRepository<Entity> {
  private _entities: Map<string, Entity> = new Map();

  get entities() {
    return this._entities;
  }

  get entitiesAsArray() {
    return Array.from(this.entities.values());
  }

  async findById(entityId: string): Promise<Entity | null> {
    const entity = this._entities.get(entityId);

    if (!entity) return null;

    return entity;
  }

  exists(entityId: string): Promise<boolean> {
    return Promise.resolve(!!this._entities.get(entityId));
  }

  async save(entity: Entity): Promise<void> {
    // @ts-ignore
    this._entities.set(entity.id.value, entity);
  }
}

export { RepositoryInMemory };
