import { Inject } from '@nestjs/common';

import { combine, left, right } from '@core/logic/either';

import { CNPJ, CPF, Password } from '../../domain/valueObjects';
import { DocumentFactory } from '../../factories/document.factory';
import { AccountAggregate } from '../../domain/aggregates/account.aggregate';

import { IAccountRepository } from '../../repositories/account.repository.interface';

import { AccountAlreadyExistsError } from './errors/AccountAlreadyExistsError';

import {
  CreateAccountResult,
  CreateAccountUseCaseDTO,
  ICreateAccountUseCase,
} from './create-account.dto';

export class CreateAccountUseCase implements ICreateAccountUseCase {
  constructor(
    @Inject('AccountRepository')
    private readonly accountRepository: IAccountRepository,
  ) {}

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

    const accountAlreadyExists = await this.accountRepository.findByDocument(
      documentOrError.value as CPF | CNPJ,
    );

    if (accountAlreadyExists) {
      return left(new AccountAlreadyExistsError());
    }

    const account = AccountAggregate.create({
      document: documentOrError.value as CPF | CNPJ,
      password: passwordOrError.value as Password,
    });

    await this.accountRepository.save(account);

    return right({ id: account.id.value });
  }
}
