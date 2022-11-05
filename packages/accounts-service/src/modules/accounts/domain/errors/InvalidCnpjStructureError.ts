import { DomainError } from '@core/domain/errors';

export class InvalidCnpjStructureError extends DomainError {
  constructor(context: string) {
    super({
      name: 'InvalidCnpjStructureError',
      message: 'O CNPJ informado não é válido.',
      code: 'domain.invalid-cnpj',
      context,
    });
  }
}
