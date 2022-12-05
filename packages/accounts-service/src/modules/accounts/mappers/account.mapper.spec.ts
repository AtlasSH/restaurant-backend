import { UniqueEntityID } from '@core/domain';

import { InvalidCnpjStructureError } from '../domain/errors/InvalidCnpjStructureError';

import {
  AccountAggregate,
  AccountAggregateProps,
} from '../domain/aggregates/account.aggregate';

import { CPF, Password } from '../domain/valueObjects';
import { AccountMapper } from './account.mapper';

describe('Mapper - Account', () => {
  it('should map a domain to persistence', () => {
    const { account, props } = makeAccount();

    const data = AccountMapper.toPersistence(account);

    expect(data).toEqual({
      id: account.id.value,
      document: props.document.value,
      password: props.password.value,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    });
  });

  it('should map a persistence to domain', () => {
    const { props } = makeAccount();

    const account = AccountMapper.toDomain({
      id: 'any_id',
      document: props.document.value,
      password: props.password.getHashedValue(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    expect(account).toBeInstanceOf(AccountAggregate);
    expect(account.id).toEqual(new UniqueEntityID('any_id'));
    expect(account.props).toEqual({
      document: props.document,
      password: props.password,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
    });
  });

  it('should throw an error if it fails to create the domain', () => {
    const { props } = makeAccount();

    const account = () =>
      AccountMapper.toDomain({
        id: 'any_id',
        document: 'invalid-document',
        password: props.password.getHashedValue(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

    expect(account).toThrowError(InvalidCnpjStructureError);
  });

  const makeAccount = () => {
    const props: AccountAggregateProps = {
      document: CPF.create('02416071084').value as CPF,
      password: Password.create('password').value as Password,
    };

    const account = AccountAggregate.create(props);

    return { account, props };
  };
});
