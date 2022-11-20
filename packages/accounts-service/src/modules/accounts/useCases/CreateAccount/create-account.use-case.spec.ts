import { DomainError } from '@core/domain/errors';

import { CPF, Password } from '../../domain/valueObjects';
import { AccountAggregate } from '../../domain/aggregates/account.aggregate';
import { AccountRepositoryInMemory } from '../../repositories/inMemory/account.repository.in-memory';

import { AccountAlreadyExistsError } from './errors/AccountAlreadyExistsError';
import { CreateAccountUseCase } from './create-account.use-case';

describe('UseCase - Create Account', () => {
  it('should create a account', async () => {
    const { sut } = makeSut();

    const result = await sut.execute(makeDTO());

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBeDefined();
    expect(result.value).toEqual(
      expect.objectContaining({ id: expect.any(String) }),
    );
  });

  it('should return an error if document is invalid', async () => {
    const { sut } = makeSut();

    const result = await sut.execute({
      document: 'invalid-document',
      password: 'valid-password',
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(DomainError);
  });

  it('should return an error if password is invalid', async () => {
    const { sut } = makeSut();

    const result = await sut.execute({
      document: '02416071084',
      password: 'inv',
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(DomainError);
  });

  it('should return an error if account already exists', async () => {
    const { sut, accountRepository } = makeSut();

    const document = '02416071084';
    const account = AccountAggregate.create({
      document: CPF.create(document).value as CPF,
      password: Password.create('password').value as Password,
    });

    accountRepository.save(account);

    const result = await sut.execute({
      document,
      password: 'password',
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(AccountAlreadyExistsError);
  });

  it('should call account aggregate', async () => {
    const { sut } = makeSut();

    const createSpy = jest.spyOn(AccountAggregate, 'create');

    await sut.execute(makeDTO());

    expect(createSpy).toHaveBeenCalled();
  });

  it('should call account repository', async () => {
    const { sut, accountRepository } = makeSut();

    const saveSpy = jest.spyOn(accountRepository, 'save');

    await sut.execute(makeDTO());

    expect(saveSpy).toHaveBeenCalled();
  });

  const makeSut = (): SutTypes => {
    const accountRepository = new AccountRepositoryInMemory();
    const sut = new CreateAccountUseCase(accountRepository);

    return { sut, accountRepository };
  };

  const makeDTO = () => {
    return {
      document: '02416071084',
      password: 'password',
    };
  };
});

type SutTypes = {
  sut: CreateAccountUseCase;
  accountRepository: AccountRepositoryInMemory;
};
