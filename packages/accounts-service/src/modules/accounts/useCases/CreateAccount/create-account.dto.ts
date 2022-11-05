import { IUseCase } from '@core/infra/protocols/layer/use-case.interface';
import { Either } from '@core/logic/either';

type CreateAccountUseCaseDTO = {
  document: string;
  password: string;
};

type CreateAccountResult = Either<Error, void>;

type ICreateAccountUseCase = IUseCase<
  CreateAccountUseCaseDTO,
  CreateAccountResult
>;

export { ICreateAccountUseCase, CreateAccountUseCaseDTO, CreateAccountResult };
