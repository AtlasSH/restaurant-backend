import { AggregateRoot, UniqueEntityID } from '@core/domain';

import { CPF, CNPJ, Password } from '../valueObjects';

export class AccountAggregate extends AggregateRoot<AccountAggregateProps> {
  private constructor(props: AccountAggregateProps, id?: UniqueEntityID) {
    super(props, id);
  }
}

type AccountAggregateProps = {
  document: CPF | CNPJ;
  password: Password;
};
