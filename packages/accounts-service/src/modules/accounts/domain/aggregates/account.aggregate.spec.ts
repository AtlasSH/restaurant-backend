import { UniqueEntityID } from '@core/domain';

import { CPF, Password } from '../valueObjects';
import { AccountAggregate, AccountAggregateProps } from './account.aggregate';

describe('Aggregate - Account', () => {
  it('should create a new account', () => {
    const props: AccountAggregateProps = {
      document: CPF.create('02416071084').value as CPF,
      password: Password.create('password').value as Password,
    };

    const account = AccountAggregate.create(props);

    expect(account).toBeDefined();
    expect(account.props).toEqual(props);
  });

  it('should create a new account with given ID', () => {
    const id = new UniqueEntityID('valid_id');

    const account = AccountAggregate.create(
      {
        document: CPF.create('02416071084').value as CPF,
        password: Password.create('password').value as Password,
      },
      id,
    );

    expect(account).toBeDefined();
    expect(account.id).toEqual(id);
  });

  it('should get valid account values', () => {
    const account = AccountAggregate.create({
      document: CPF.create('02416071084').value as CPF,
      password: Password.create('password').value as Password,
    });

    expect(account.id).toBeDefined();
    expect(account.createdAt).toBeDefined();
    expect(account.isDeleted).toBeFalsy();

    expect(account.document.value).toBe('02416071084');
    expect(account.password.value).toBe('password');
  });
});
