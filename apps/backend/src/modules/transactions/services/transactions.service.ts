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

  async findAllByUserId(userId: string) {
    return await this.transactionsRepository.findMany({
      where: { userId },
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

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }

  private async validateEntitiesOnweship({
    userId,
    categoryId,
    bankAccountId,
    transactionId,
  }: {
    userId: string;
    categoryId: string;
    bankAccountId: string;
    transactionId?: string;
  }) {
    await Promise.all([
      this.validateBankAccountsOwnershipService.validate(userId, bankAccountId),
      this.validateCategoryOwnershipService.validate(userId, categoryId),
      this.validateTransactionOwnershipService.validate(userId, transactionId),
    ]);
  }
}
