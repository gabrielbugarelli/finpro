import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createUserDTO: Prisma.UserCreateArgs,
  ): Promise<Prisma.UserCreateInput> {
    const user = this.prismaService.user.create(createUserDTO);
    return user;
  }

  async findUnique(
    findUniqueDTO: Prisma.UserFindUniqueArgs,
  ): Promise<Prisma.UserCreateInput> {
    return await this.prismaService.user.findUnique(findUniqueDTO);
  }
}
