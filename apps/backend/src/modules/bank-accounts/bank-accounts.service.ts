import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
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
    return await this.bankAccountsRepository.findMany({
      where: { userId },
    });
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    await this.validateBankAccountOwnership(userId, bankAccountId);

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
    await this.validateBankAccountOwnership(userId, bankAccountId);

    await this.bankAccountsRepository.remove({
      where: { id: bankAccountId },
    });
  }

  private async validateBankAccountOwnership(
    userId: string,
    bankAccountId: string,
  ) {
    const isOwner = await this.bankAccountsRepository.findFirst({
      where: { id: bankAccountId, userId },
    });

    if (!isOwner) {
      throw new NotFoundException('Bank account not found');
    }

    return isOwner;
  }
}
