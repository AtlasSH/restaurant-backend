import { InvalidCpfStructureError } from '../errors/InvalidCpfStructureError';

import { CPF } from './cpf.value-object';

describe('Value Object - CPF', () => {
  it('should accept a valid cpf', () => {
    const cpf = CPF.create('97844031026');

    expect(cpf.isRight()).toBeTruthy();
    expect(cpf.value).toHaveProperty('value', '97844031026');
  });

  it('should accept and format a pattern cpf to only digits', () => {
    const cpf = CPF.create('978.440.310-26');

    expect(cpf.isRight()).toBeTruthy();
    expect(cpf.value).toHaveProperty('value', '97844031026');
  });

  it('should format a only digits cpf to pattern', () => {
    const cpf = CPF.create('97844031026').value as CPF;

    cpf.formatToCpfPattern();

    expect(cpf.value).toEqual('978.440.310-26');
  });

  it('should format a cpf pattern to only digits', () => {
    const cpfOrError = CPF.create('978.440.310-26');
    const cpf = cpfOrError.value as CPF;

    cpf.removeSpecialChars();

    expect(cpf.value).toEqual('97844031026');
  });

  it('should reject if cpf has an invalid length', () => {
    const cpf = CPF.create('1');

    expect(cpf.isLeft()).toBeTruthy();
    expect(cpf.value).toBeInstanceOf(InvalidCpfStructureError);
  });

  it('should reject if cpf sum is invalid', () => {
    const cpf = CPF.create('97844031027');

    expect(cpf.isLeft()).toBeTruthy();
    expect(cpf.value).toBeInstanceOf(InvalidCpfStructureError);
  });

  it('should reject if cpf is on blacklist', () => {
    const cpf = CPF.create('11111111111');

    expect(cpf.isLeft()).toBeTruthy();
    expect(cpf.value).toBeInstanceOf(InvalidCpfStructureError);
  });
});
