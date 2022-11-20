import { UseCaseError } from '@core/domain/errors/use-case.error';

export class AccountAlreadyExistsError extends UseCaseError {
  constructor() {
    super({
      name: 'AccountAlreadyExistsError',
      message: 'Uma conta com este documento já existe.',
      code: 'useCase.account-exists',
    });
  }
}
