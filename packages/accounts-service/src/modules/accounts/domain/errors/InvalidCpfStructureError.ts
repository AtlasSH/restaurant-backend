import { DomainError } from '@core/domain/errors';

export class InvalidCpfStructureError extends DomainError {
  constructor(context: string) {
    super({
      name: 'InvalidCpfStructureError',
      message: 'O CPF informado não é válido.',
      code: 'domain.invalid-cpf',
      context,
    });
  }
}
