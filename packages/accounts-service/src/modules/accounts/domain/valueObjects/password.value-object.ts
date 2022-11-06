import { compareSync, genSaltSync, hashSync } from 'bcrypt';

import { ValueObject } from '@core/domain';
import { Either, left, right } from '@core/logic/either';
import { InvalidPasswordLengthError } from '../errors/InvalidPasswordLengthError';

export class Password extends ValueObject<PasswordProps> {
  private readonly isEncrypted: boolean;
  private static readonly MAX_LENGTH = 22;
  private static readonly MIN_LENGTH = 5;

  private constructor(props: PasswordProps, isEncrypted: boolean) {
    super(props);
    this.isEncrypted = isEncrypted;
  }

  get value(): string {
    return this.props.value;
  }

  compare(plainText: string): boolean {
    if (!this.isEncrypted) {
      return plainText === this.props.value;
    }

    return compareSync(plainText, this.props.value);
  }

  getHashedValue(): string {
    if (this.isEncrypted) {
      return this.value;
    }

    const salt = genSaltSync();

    return hashSync(this.props.value, salt);
  }

  private static validateLength(password: string): boolean {
    if (
      password.trim().length < this.MIN_LENGTH ||
      password.trim().length > this.MAX_LENGTH
    ) {
      return false;
    }

    return true;
  }

  static create(value: string, isHashed = false): Either<Error, Password> {
    if (!isHashed && !this.validateLength(value)) {
      return left(
        new InvalidPasswordLengthError(
          'Create Password V.O',
          this.MIN_LENGTH,
          this.MAX_LENGTH,
        ),
      );
    }

    return right(new Password({ value }, isHashed));
  }
}

type PasswordProps = {
  value: string;
};
