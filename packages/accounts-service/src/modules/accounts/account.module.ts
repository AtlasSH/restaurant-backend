import { Module } from '@nestjs/common';

import { PrismaAccountRepository } from './repositories/prisma/account.repository';

import { CreateAccountResolver } from './useCases/createAccount/create-account.resolver';
import { CreateAccountUseCase } from './useCases/createAccount/create-account.use-case';

const graphqlResolvers = [CreateAccountResolver];

const useCases = [CreateAccountUseCase];

@Module({
  imports: [],
  providers: [
    ...useCases,
    ...graphqlResolvers,

    {
      provide: 'AccountRepository',
      useClass: PrismaAccountRepository,
    },
  ],
  exports: [],
})
export class AccountModule {}
