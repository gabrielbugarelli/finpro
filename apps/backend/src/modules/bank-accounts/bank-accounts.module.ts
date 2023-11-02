import { Module } from '@nestjs/common';
import { BankAccountsService } from './services/bank-accounts.service';
import { BankAccountsController } from './bank-accounts.controller';
import { ValidateBankAccountsOwnershipService } from './services/validate-bank-accounts-ownerhip.service';

@Module({
  controllers: [BankAccountsController],
  providers: [BankAccountsService, ValidateBankAccountsOwnershipService],
  exports: [ValidateBankAccountsOwnershipService],
})
export class BankAccountsModule {}
