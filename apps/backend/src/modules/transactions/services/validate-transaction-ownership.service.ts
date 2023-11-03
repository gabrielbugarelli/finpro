import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsReporitory } from 'src/shared/database/repositories/transactions.repositories';

@Injectable()
export class ValidateTransactionOwnershipService {
  constructor(private readonly transactionRepository: TransactionsReporitory) {}

  async validate(userId: string, transactionId: string) {
    const isOwner = await this.transactionRepository.findFirst({
      where: { userId, id: transactionId },
    });

    if (!isOwner) {
      throw new NotFoundException('Transaction not found');
    }
  }
}
