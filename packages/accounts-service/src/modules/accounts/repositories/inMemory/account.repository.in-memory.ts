import { RepositoryInMemory } from '@core/tests/repository.in-memory';

import { CPF, CNPJ } from '../../domain/valueObjects';
import { AccountAggregate } from '../../domain/aggregates/account.aggregate';

import { IAccountRepository } from '../account.repository.interface';

export class AccountRepositoryInMemory
  extends RepositoryInMemory<AccountAggregate>
  implements IAccountRepository
{
  async findByDocument(document: CPF | CNPJ): Promise<AccountAggregate> {
    const entity = this.entitiesAsArray.find(
      (entity) => entity.document.value === document.value,
    );

    if (!entity) return null;

    return entity;
  }
}
