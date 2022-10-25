import { ValueObject } from './value-object';
import UniqueEntityID from './unique-entity-id';

type CustomVOProps = Record<string, string>;

class CustomVO extends ValueObject<CustomVOProps> {}

describe('Domain - ValueObject', () => {
  it('should generate an ID if not provided', () => {
    const valueObject = new CustomVO({});

    expect(valueObject.id).toBeTruthy();
  });

  it('should use the provided ID if provided', () => {
    const valueObject = new CustomVO({}, new UniqueEntityID('custom-id'));

    expect(valueObject.id.value).toEqual('custom-id');
  });

  it('should be able to check equality', () => {
    const valueObjectOne = new CustomVO({}, new UniqueEntityID('same-id'));
    const valueObjectTwo = new CustomVO({}, new UniqueEntityID('same-id'));

    class Another {}

    expect(valueObjectOne.equals(null)).toBeFalsy();
    expect(valueObjectOne.equals(new Another() as any)).toBeFalsy();
    expect(valueObjectOne.equals(valueObjectOne)).toBeTruthy();
    expect(valueObjectOne.equals(valueObjectTwo)).toBeTruthy();
  });
});
