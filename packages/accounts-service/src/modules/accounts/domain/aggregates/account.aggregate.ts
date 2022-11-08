import { AggregateRoot, UniqueEntityID } from '@core/domain';

import { CPF, CNPJ, Password } from '../valueObjects';

export class AccountAggregate extends AggregateRoot<AccountAggregateProps> {
  private constructor(props: AccountAggregateProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get document(): CPF | CNPJ {
    return this.props.document;
  }

  get password(): Password {
    return this.props.password;
  }

  static create(
    props: AccountAggregateProps,
    id?: UniqueEntityID,
  ): AccountAggregate {
    return new AccountAggregate(props, id);
  }
}

type AccountAggregateProps = {
  document: CPF | CNPJ;
  password: Password;
};
