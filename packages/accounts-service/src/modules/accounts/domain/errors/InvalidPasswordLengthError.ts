import { DomainError } from '@core/domain/errors';

export class InvalidPasswordLengthError extends DomainError {
  constructor(context: string, minLength: number, maxLength: number) {
    super({
      name: 'InvalidPasswordLengthError',
      message: `A senha deve ter entre ${minLength} e ${maxLength} caracteres.`,
      code: 'domain.password.length',
      context,
    });
  }
}
