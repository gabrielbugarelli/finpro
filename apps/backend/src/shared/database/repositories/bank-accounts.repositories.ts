import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class BankAccountsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createBankAccountDTO: Prisma.BankAccountCreateArgs) {
    return await this.prismaService.bankAccount.create(createBankAccountDTO);
  }

  async findMany(findManyDTO: Prisma.BankAccountFindManyArgs) {
    return await this.prismaService.bankAccount.findMany(findManyDTO);
  }

  async findFirst(findFirstDTO: Prisma.BankAccountFindFirstArgs) {
    return await this.prismaService.bankAccount.findFirst(findFirstDTO);
  }

  async update(updateDTO: Prisma.BankAccountUpdateArgs) {
    return await this.prismaService.bankAccount.update(updateDTO);
  }

  async remove(removeDTO: Prisma.BankAccountDeleteArgs) {
    await this.prismaService.bankAccount.delete(removeDTO);
  }
}
