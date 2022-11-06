import { validate } from 'uuid';

import { UniqueEntityID } from './unique-entity-id';

describe('Domain - UniqueEntityID', () => {
  it('should create a new UUID if not provided', () => {
    const uniqueEntityID = new UniqueEntityID();

    const validUUID = validate(uniqueEntityID.value as string);

    expect(uniqueEntityID).toBeDefined();
    expect(validUUID).toBeTruthy();
  });

  it('should create a id with provided value', () => {
    const uniqueEntityID = new UniqueEntityID('CUSTOM-ID');

    expect(uniqueEntityID).toBeDefined();
    expect(uniqueEntityID.value).toEqual('CUSTOM-ID');
  });
});
