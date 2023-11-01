import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dtos/sign-in.dto';
import { SignUpDTO } from './dtos/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() signInDTO: SignInDTO): Promise<{ accessToken: string }> {
    return await this.authService.signIn(signInDTO);
  }

  @Post('signup')
  async create(@Body() signUpDTO: SignUpDTO): Promise<{ accessToken: string }> {
    return await this.authService.signUp(signUpDTO);
  }
}
