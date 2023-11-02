import { Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all bankAccounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bankAccount`;
  }

  update(id: number, updateBankAccountDto: UpdateBankAccountDto) {
    return `This action updates a #${id} bankAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} bankAccount`;
  }
}
