import {
  CreateAccountResult,
  CreateAccountUseCaseDTO,
  ICreateAccountUseCase,
} from './create-account.dto';

export class CreateAccountUseCase implements ICreateAccountUseCase {
  execute(dto: CreateAccountUseCaseDTO): Promise<CreateAccountResult> {
    throw new Error('Method not implemented.');
  }
}
