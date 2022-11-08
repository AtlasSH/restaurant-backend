import { PrismaService } from '@infra/db/prisma/prisma.service';

import { AccountAggregate } from '../../domain/aggregates/account.aggregate';
import { CPF, CNPJ } from '../../domain/valueObjects';

import { AccountMapper } from '../../mappers/account.mapper';

import { IAccountRepository } from '../account.repository.interface';

export class AccountRepository implements IAccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<AccountAggregate> {
    const account = await this.prisma.account.findUnique({ where: { id } });

    if (!account) return null;

    return AccountMapper.toDomain(account);
  }

  async findByDocument(document: CPF | CNPJ): Promise<AccountAggregate> {
    const account = await this.prisma.account.findUnique({
      where: { document: document.value },
    });

    if (!account) return null;

    return AccountMapper.toDomain(account);
  }

  async exists(id: string): Promise<boolean> {
    return !!(await this.prisma.account.findUnique({
      where: { id },
      select: { id: true },
    }));
  }

  async save(entity: AccountAggregate): Promise<void> {
    const persistence = AccountMapper.toPersistence(entity);

    await this.prisma.account.create({ data: persistence });
  }
}
