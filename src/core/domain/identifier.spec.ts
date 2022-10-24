import Identifier from './identifier';

describe('Domain - Identifier', () => {
  it('should create a id with provided value', () => {
    const identifier = new Identifier('CUSTOM-ID');

    expect(identifier).toBeDefined();
    expect(identifier.value).toEqual('CUSTOM-ID');
  });

  it('should convert number to string', () => {
    const identifier = new Identifier(1234567891011124);

    expect(identifier).toBeDefined();
    expect(typeof identifier.toString() === 'string').toBeTruthy();
  });

  it('should be able to check equality', () => {
    const uniqueOne = new Identifier('SAME-ID');
    const uniqueTwo = new Identifier('SAME-ID');

    expect(uniqueOne.equals(null)).toBeFalsy();
    expect(uniqueOne.equals(uniqueOne)).toBeTruthy();
    expect(uniqueOne.equals(uniqueTwo)).toBeTruthy();
  });
});
