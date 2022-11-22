import { hashSync } from 'bcrypt';

import { InvalidPasswordLengthError } from '../errors/InvalidPasswordLengthError';

import { Password } from './password.value-object';

describe('Value Object - Password', () => {
  it('should create a valid password', () => {
    const password = Password.create('123ABC');

    expect(password.isRight()).toBeTruthy();
    expect(password.value).toHaveProperty('value', '123ABC');
  });

  it('should create a valid encrypted password', () => {
    const encryptedPass = hashSync('123ABC', 10);
    const password = Password.create(encryptedPass, true);

    expect(password.isRight()).toBeTruthy();
    expect(password.value).toHaveProperty('value', encryptedPass);
  });

  it('should create a valid password and encrypt after create', () => {
    const password = Password.create('123ABC').value as Password;

    password.getHashedValue();
    const isEqualPassword = password.compare('123ABC');

    expect(isEqualPassword).toBeTruthy();
  });

  it('should return a encrypted password if already encrypted', () => {
    const encryptedPass = hashSync('123ABC', 10);
    const password = Password.create(encryptedPass, true).value as Password;

    const hashedPassword = password.getHashedValue();

    expect(hashedPassword).toEqual(encryptedPass);
  });

  it('should reject a password when the length is less than 5', () => {
    const password = Password.create('1234');

    expect(password.isLeft).toBeTruthy();
    expect(password.value).toBeInstanceOf(InvalidPasswordLengthError);
  });

  it('should reject a password when the length is bigger than 22', () => {
    const longPassword = '1'.padEnd(23, '1');
    const password = Password.create(longPassword);

    expect(password.isLeft).toBeTruthy();
    expect(password.value).toBeInstanceOf(InvalidPasswordLengthError);
  });

  it('should compare an encrypted password and return false if does not match', () => {
    const password = Password.create('123ABC').value as Password;

    const isEqual = password.compare('invalid_password');

    expect(isEqual).toBeFalsy();
  });
});
