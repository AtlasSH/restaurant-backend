import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { IResolver } from '@core/infra/protocols/layer/resolver.interface';

import { CreateAccountInput } from '../../graphql/inputs/create-account.input';

import { CreateAccountUseCase } from './create-account.use-case';

@Resolver()
export class CreateAccountResolver implements IResolver {
  constructor(private readonly useCase: CreateAccountUseCase) {}

  @Query(() => String)
  hello(): string {
    return 'word';
  }

  @Mutation(() => Boolean, { name: 'createAccount' })
  async handle(@Args('data') data: CreateAccountInput): Promise<boolean> {
    const result = await this.useCase.execute(data);

    if (result.isLeft()) {
      throw result.value;
    }

    return result.isRight();
  }
}
