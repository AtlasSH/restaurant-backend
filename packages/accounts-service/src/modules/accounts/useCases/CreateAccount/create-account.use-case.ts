import { combine, left, right } from '@core/logic/either';
import { AccountAggregate } from '@modules/accounts/domain/aggregates/account.aggregate';

import { CNPJ, CPF, Password } from '../../domain/valueObjects';
import { DocumentFactory } from '../../factories/document.factory';
import { IAccountRepository } from '../../repositories/account.repository.interface';

import { AccountAlreadyExistsError } from './errors/AccountAlreadyExistsError';

import {
  CreateAccountResult,
  CreateAccountUseCaseDTO,
  ICreateAccountUseCase,
} from './create-account.dto';

export class CreateAccountUseCase implements ICreateAccountUseCase {
  constructor(private readonly accountRepository: IAccountRepository) {}

  async execute({
    document,
    password,
  }: CreateAccountUseCaseDTO): Promise<CreateAccountResult> {
    const documentOrError = DocumentFactory.create(document);
    const passwordOrError = Password.create(password, false);

    const hasErrorOnValueObjects = combine([documentOrError, passwordOrError]);

    if (hasErrorOnValueObjects.isLeft()) {
      return left(hasErrorOnValueObjects.value);
    }

    const userAlreadyExists = await this.accountRepository.findByDocument(
      documentOrError.value as CPF | CNPJ,
    );

    if (userAlreadyExists) {
      return left(new AccountAlreadyExistsError());
    }

    const accountOrError = AccountAggregate.create({
      document: documentOrError.value as CPF | CNPJ,
      password: passwordOrError.value as Password,
    });

    await this.accountRepository.save(accountOrError);

    return right(undefined);
  }
}
