import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/db/database.module';
import { HttpModule } from '@infra/http/http.module';

import { AccountModule } from '@modules/accounts/account.module';

@Module({
  imports: [DatabaseModule, HttpModule, AccountModule],
  exports: [],
  providers: [],
})
export class AppModule {}
