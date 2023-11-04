import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionsReporitory } from 'src/shared/database/repositories/transactions.repositories';
import { ValidateBankAccountsOwnershipService } from '../../bank-accounts/services/validate-bank-accounts-ownerhip.service';
import { ValidateCategoryOwnershipService } from '../../categories/services/validate-category-ownerhip.service';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsReporitory,
    private readonly validateBankAccountsOwnershipService: ValidateBankAccountsOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
    private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    await this.validateEntitiesOnweship({
      userId,
      categoryId: createTransactionDto.categoryId,
      bankAccountId: createTransactionDto.bankAccountId,
    });

    return await this.transactionsRepository.create({
      data: {
        userId,
        ...createTransactionDto,
      },
    });
  }

  async findAllByUserId(
    userId: string,
    filter: { month: number; year: number; bankAccountId?: string },
  ) {
    return await this.transactionsRepository.findMany({
      where: {
        userId,
        bankAccountId: filter.bankAccountId,
        date: {
          gte: new Date(Date.UTC(filter.year, filter.month)),
          lt: new Date(Date.UTC(filter.year, filter.month + 1)),
        },
      },
    });
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    await this.validateEntitiesOnweship({
      userId,
      transactionId,
      categoryId: updateTransactionDto.categoryId,
      bankAccountId: updateTransactionDto.bankAccountId,
    });

    return await this.transactionsRepository.update({
      where: { id: transactionId },
      data: { ...updateTransactionDto },
    });
  }

  async remove(userId: string, transactionId: string) {
    await this.validateEntitiesOnweship({ userId, transactionId });
    await this.transactionsRepository.remove({
      where: { id: transactionId },
    });
  }

  private async validateEntitiesOnweship({
    userId,
    categoryId,
    bankAccountId,
    transactionId,
  }: {
    userId: string;
    categoryId?: string;
    bankAccountId?: string;
    transactionId?: string;
  }) {
    await Promise.all([
      bankAccountId &&
        this.validateBankAccountsOwnershipService.validate(
          userId,
          bankAccountId,
        ),
      categoryId &&
        this.validateCategoryOwnershipService.validate(userId, categoryId),
      transactionId &&
        this.validateTransactionOwnershipService.validate(
          userId,
          transactionId,
        ),
    ]);
  }
}
