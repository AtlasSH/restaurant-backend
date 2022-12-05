import { IRepository } from '@core/infra/protocols/layer/repository.interface';

import { AccountAggregate } from '../domain/aggregates/account.aggregate';
import { CNPJ, CPF } from '../domain/valueObjects';

export interface IAccountRepository extends IRepository<AccountAggregate> {
  findByDocument(document: CPF | CNPJ): Promise<AccountAggregate | null>;
}
