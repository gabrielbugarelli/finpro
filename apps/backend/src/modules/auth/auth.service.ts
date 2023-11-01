import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDTO } from './dtos/sign-in.dto';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { SignUpDTO } from './dtos/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDTO: SignInDTO): Promise<{ accessToken: string }> {
    const { email, password } = signInDTO;

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

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  async signUp(signUpDTO: SignUpDTO): Promise<{ accessToken: string }> {
    const { name, email, password } = signUpDTO;

    const emailExists = await this.usersRepository.findUnique({
      where: { email },
      select: { id: true },
    });

    if (emailExists) {
      throw new ConflictException('E-mail already exists');
    }

    const encryptedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      data: {
        name,
        email,
        password: encryptedPassword,
        categories: {
          createMany: {
            data: [
              // Income
              { name: 'Salário', icon: 'salary', type: 'INCOME' },
              { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
              { name: 'Outro', icon: 'other', type: 'INCOME' },
              // Expense
              { name: 'Casa', icon: 'home', type: 'EXPENSE' },
              { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
              { name: 'Educação', icon: 'education', type: 'EXPENSE' },
              { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
              { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
              { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
              { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
              { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
              { name: 'Outro', icon: 'other', type: 'EXPENSE' },
            ],
          },
        },
      },
    });

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  private async generateAccessToken(userId: string) {
    return await this.jwtService.signAsync({ sub: userId });
  }
}
