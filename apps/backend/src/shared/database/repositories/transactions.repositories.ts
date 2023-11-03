import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class TransactionsReporitory {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTransactionDTO: Prisma.TransactionCreateArgs) {
    return await this.prismaService.transaction.create(createTransactionDTO);
  }

  async findMany(findManyDTO: Prisma.TransactionFindManyArgs) {
    return await this.prismaService.transaction.findMany(findManyDTO);
  }

  async findFirst(findFirstDTO: Prisma.TransactionFindFirstArgs) {
    return await this.prismaService.transaction.findFirst(findFirstDTO);
  }

  async update(updateDTO: Prisma.TransactionUpdateArgs) {
    return await this.prismaService.transaction.update(updateDTO);
  }

  async remove(removeDTO: Prisma.TransactionDeleteArgs) {
    await this.prismaService.transaction.delete(removeDTO);
  }
}
