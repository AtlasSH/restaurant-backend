import { Either, left, right } from '@core/logic/either';
import { ValueObject } from '@core/domain';

import {
  formatValueToCpfPattern,
  isValidCpfDigit,
  removeSpecialCharsFromCpf,
} from '@utils/check-cpf-digit.util';

import { InvalidCpfStructureError } from '../errors/InvalidCpfStructureError';

const regexCpf =
  /^([0-9]{3})[\.]((?!\1)[0-9]{3})[\.]([0-9]{3})[-]([0-9]{2})$|^[0-9]{11}$/;

export class CPF extends ValueObject<CPFProps> {
  protected static readonly REGEX = regexCpf;

  private constructor(props: CPFProps) {
    super(props);
    this.removeSpecialChars();
  }

  get value(): string {
    return this.props.value;
  }

  formatToCpfPattern(): CPF {
    this.props.value = formatValueToCpfPattern(this.props.value);
    return this;
  }

  removeSpecialChars(): CPF {
    this.props.value = removeSpecialCharsFromCpf(this.props.value);
    return this;
  }

  static validate(cpf: string): boolean {
    const isValidPattern = this.REGEX.test(cpf);
    const isValidDigits = isValidCpfDigit(cpf);
    return isValidPattern && isValidDigits;
  }

  static create(value: string): Either<InvalidCpfStructureError, CPF> {
    const isValidValue = this.validate(value);

    if (!isValidValue) {
      return left(new InvalidCpfStructureError('Create CPF V.O'));
    }

    return right(new CPF({ value }));
  }
}

type CPFProps = {
  value: string;
};
