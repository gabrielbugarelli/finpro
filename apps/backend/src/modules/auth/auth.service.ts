import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticateDTO } from './dtos/authenticate.dto';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async authenticate(authenticateDTO: AuthenticateDTO) {
    const { email, password } = authenticateDTO;

    const user = await this.usersRepository.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid crenditals');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid crenditals');
    }

    //generate jwt

    return user;
  }
}
