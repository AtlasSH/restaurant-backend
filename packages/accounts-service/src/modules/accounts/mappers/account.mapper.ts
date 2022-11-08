import { UniqueEntityID } from '@core/domain';
import { combine } from '@core/logic/either';

import { DocumentFactory } from '../factories/document.factory';

import { AccountAggregate } from '../domain/aggregates/account.aggregate';
import { CNPJ, CPF, Password } from '../domain/valueObjects';

class AccountMapper {
  static toDomain(raw: AccountPersistence): AccountAggregate {
    const documentOrError = DocumentFactory.create(raw.document);
    const passwordOrError = Password.create(raw.password, true);

    const hasErrorOnValueObjects = combine([documentOrError, passwordOrError]);

    if (hasErrorOnValueObjects.isLeft) {
      throw hasErrorOnValueObjects.value;
    }

    const account = AccountAggregate.create(
      {
        document: documentOrError.value as CPF | CNPJ,
        password: passwordOrError.value as Password,
      },
      new UniqueEntityID(raw.id),
    );

    return account;
  }

  static toPersistence(raw: AccountAggregate): AccountPersistence {
    return {
      id: raw.id.toString(),
      document: raw.document.value,
      password: raw.password.getHashedValue(),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }
}

type AccountPersistence = {
  id: string;
  document: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export { AccountMapper };
