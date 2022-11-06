import { Either, left, right } from '@core/logic/either';
import { ValueObject } from '@core/domain';

import {
  formatValueToCnpjPattern,
  isValidCnpjDigit,
  removeSpecialCharsFromCnpj,
} from '@utils/check-cnpj-digit.util';

import { InvalidCnpjStructureError } from '../errors/InvalidCnpjStructureError';

const regexCnpj =
  /^([0-9]{2})[\.]([0-9]{3})[\.]((?!\2)[0-9]{3})[\/]([0-9]{4})[-]([0-9]{2})$|^[0-9]{14}$/;

export class CNPJ extends ValueObject<CNPJProps> {
  protected static readonly REGEX = regexCnpj;

  private constructor(props: CNPJProps) {
    super(props);
    this.removeSpecialChars();
  }

  get value(): string {
    return this.props.value;
  }

  formatToCnpjPattern(): CNPJ {
    this.props.value = formatValueToCnpjPattern(this.props.value);
    return this;
  }

  removeSpecialChars(): CNPJ {
    this.props.value = removeSpecialCharsFromCnpj(this.props.value);
    return this;
  }

  static validate(cnpj: string): boolean {
    const isValidPattern = this.REGEX.test(cnpj);
    const isValidDigits = isValidCnpjDigit(cnpj);
    return isValidPattern && isValidDigits;
  }

  static create(value: string): Either<Error, CNPJ> {
    const isValidValue = this.validate(value);

    if (!isValidValue) {
      return left(new InvalidCnpjStructureError('Create CNPJ V.O'));
    }

    return right(new CNPJ({ value }));
  }
}

type CNPJProps = {
  value: string;
};
