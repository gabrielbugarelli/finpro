import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class BankAccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createBankAccountDTO: Prisma.BankAccountCreateArgs) {
    return await this.prismaService.bankAccount.create(createBankAccountDTO);
  }
}
