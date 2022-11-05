import { InvalidCnpjStructureError } from '../errors/InvalidCnpjStructureError';

import { CNPJ } from './cnpj.value-object';

describe('Value Object - CNPJ', () => {
  it('should accept a valid cnpj', () => {
    const cnpj = CNPJ.create('96763534000149');

    expect(cnpj.isRight()).toBeTruthy();
    expect(cnpj.value).toHaveProperty('value', '96763534000149');
  });

  it('should accept and format a pattern cnpj to only digits', () => {
    const cnpj = CNPJ.create('96.763.534/0001-49');

    expect(cnpj.isRight()).toBeTruthy();
    expect(cnpj.value).toHaveProperty('value', '96763534000149');
  });

  it('should format a only digits cnpj to pattern', () => {
    const cnpj = CNPJ.create('96763534000149').value as CNPJ;

    cnpj.formatToCnpjPattern();

    expect(cnpj.value).toEqual('96.763.534/0001-49');
  });

  it('should format a cnpj pattern to only digits', () => {
    const cnpj = CNPJ.create('96.763.534/0001-49').value as CNPJ;

    cnpj.removeSpecialChars();

    expect(cnpj.value).toEqual('96763534000149');
  });

  it('should reject if cnpj has an invalid length', () => {
    const cnpj = CNPJ.create('1');

    expect(cnpj.isLeft()).toBeTruthy();
    expect(cnpj.value).toBeInstanceOf(InvalidCnpjStructureError);
  });

  it('should reject if cnpj sum is invalid', () => {
    const cnpj = CNPJ.create('96763534000148');

    expect(cnpj.isLeft()).toBeTruthy();
    expect(cnpj.value).toBeInstanceOf(InvalidCnpjStructureError);
  });

  it('should reject if cnpj is on blacklist', () => {
    const cnpj = CNPJ.create('11111111111111');

    expect(cnpj.isLeft()).toBeTruthy();
    expect(cnpj.value).toBeInstanceOf(InvalidCnpjStructureError);
  });
});
