import { UniqueEntityID, Entity } from '@core/domain';

import { RepositoryInMemory } from './repository.in-memory';

type TestEntityProps = Record<string, string>;

const makeTestEntity = (): Entity<TestEntityProps> => {
  class TestEntity extends Entity<TestEntityProps> {}
  return new TestEntity({ anyProp: 'anyValue' }, new UniqueEntityID());
};

const makeTestRepositoryInMemory = (): RepositoryInMemory<
  Entity<TestEntityProps>
> => {
  class TestRepositoryInMemory extends RepositoryInMemory<
    Entity<TestEntityProps>
  > {}

  return new TestRepositoryInMemory();
};

let sut = makeTestRepositoryInMemory();

describe('Core - RepositoryInMemory', () => {
  beforeEach(() => {
    sut = makeTestRepositoryInMemory();
  });

  it('should save an Entity', async () => {
    const testEntity = makeTestEntity();
    await sut.save(testEntity);
    const entities = sut.entities;
    expect(entities.has(testEntity.id.value)).toBeTruthy();
  });

  it('should return true if an specific entity exists', async () => {
    const testEntity = makeTestEntity();
    await sut.save(testEntity);
    const exists = sut.exists(testEntity.id.value);
    expect(exists).toBeTruthy();
  });

  it('should return an entity by id', async () => {
    const testEntity = makeTestEntity();
    await sut.save(testEntity);
    const returnedEntity = await sut.findById(testEntity.id.value);
    expect(returnedEntity).toBe(testEntity);
  });

  it('should return undefined if an entity can`t be found', async () => {
    const testEntity = makeTestEntity();
    const returnedEntity = await sut.findById(testEntity.id.value);
    expect(returnedEntity).toBe(null);
  });

  it('should return all entities as array', async () => {
    const testEntity = makeTestEntity();
    await sut.save(testEntity);
    expect(sut.entitiesAsArray).toBeInstanceOf(Array);
    expect(sut.entitiesAsArray).toEqual([testEntity]);
  });
});
