import { Entity } from './entity';
import UniqueEntityID from './unique-entity-id';

type CustomEntityProps = Record<string, string>;

class CustomEntity extends Entity<CustomEntityProps> {}

describe('Domain - Entity', () => {
  it('should generate an ID if not provided', () => {
    const entity = new CustomEntity({});

    expect(entity.id).toBeTruthy();
  });

  it('should generate createdAt if not provided', () => {
    const entity = new CustomEntity({});

    expect(entity.createdAt).toBeTruthy();
  });

  it('should generate updatedAt if not provided', () => {
    const entity = new CustomEntity({});

    expect(entity.updatedAt).toBeTruthy();
  });

  it('should generate isDeleted as false if not provided', () => {
    const entity = new CustomEntity({});

    expect(entity.isDeleted).toBeFalsy();
  });

  it('should use the provided ID if provided', () => {
    const entity = new CustomEntity({}, new UniqueEntityID('custom-id'));

    expect(entity.id.value).toEqual('custom-id');
  });

  it('should be able to check equality', () => {
    const entityOne = new CustomEntity({}, new UniqueEntityID('same-id'));
    const entityTwo = new CustomEntity({}, new UniqueEntityID('same-id'));

    class Another {}

    expect(entityOne.equals(null)).toBeFalsy();
    expect(entityOne.equals(new Another() as any)).toBeFalsy();
    expect(entityOne.equals(entityOne)).toBeTruthy();
    expect(entityOne.equals(entityTwo)).toBeTruthy();
  });
});
