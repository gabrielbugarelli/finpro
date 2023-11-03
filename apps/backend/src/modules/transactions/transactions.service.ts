import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsReporitory } from 'src/shared/database/repositories/transactions.repositories';
import { ValidateBankAccountsOwnershipService } from '../bank-accounts/services/validate-bank-accounts-ownerhip.service';
import { ValidateCategoryOwnershipService } from '../categories/services/validate-category-ownerhip.service';
import { error } from 'console';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsReporitory,
    private readonly validateBankAccountsOwnershipService: ValidateBankAccountsOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
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

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }

  private async validateEntitiesOnweship({
    userId,
    categoryId,
    bankAccountId,
  }: {
    userId: string;
    categoryId: string;
    bankAccountId: string;
  }) {
    await Promise.all([
      this.validateBankAccountsOwnershipService.validate(userId, bankAccountId),
      this.validateCategoryOwnershipService.validate(userId, categoryId),
    ]);
  }
}
