import { Body, Controller, Post, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dtos/sign-in.dto';
import { SignUpDTO } from './dtos/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @SetMetadata('IS_PUBLIC', true)
  async signIn(@Body() signInDTO: SignInDTO): Promise<{ accessToken: string }> {
    return await this.authService.signIn(signInDTO);
  }

  @SetMetadata('IS_PUBLIC', true)
  @Post('signup')
  async signUp(@Body() signUpDTO: SignUpDTO): Promise<{ accessToken: string }> {
    return await this.authService.signUp(signUpDTO);
  }
}
