import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
import { ValidateBankAccountsOwnershipService } from './validate-bank-accounts-ownerhip.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
    private readonly validateBankAccountsOwnershipService: ValidateBankAccountsOwnershipService,
  ) {}

  async create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    return await this.bankAccountsRepository.create({
      data: {
        ...createBankAccountDto,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async findAllByUserId(userId: string) {
    const bankAccounts = await this.bankAccountsRepository.findMany({
      where: { userId },
      include: {
        transactions: {
          select: {
            type: true,
            value: true,
          },
        },
      },
    });

    return bankAccounts.map(({ transactions, ...bankAccount }) => {
      const totalTransactions = transactions.reduce(
        (acc, transaction) =>
          acc +
          (transaction.type === 'INCOME'
            ? transaction.value
            : -transaction.value),
        0,
      );

      const currentBalance = bankAccount.initialBalance + totalTransactions;

      return {
        ...bankAccount,
        currentBalance,
      };
    });
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    await this.validateBankAccountsOwnershipService.validate(
      userId,
      bankAccountId,
    );

    return await this.bankAccountsRepository.update({
      where: {
        id: bankAccountId,
        userId,
      },
      data: {
        ...updateBankAccountDto,
      },
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateBankAccountsOwnershipService.validate(
      userId,
      bankAccountId,
    );

    await this.bankAccountsRepository.remove({
      where: { id: bankAccountId },
    });
  }
}
