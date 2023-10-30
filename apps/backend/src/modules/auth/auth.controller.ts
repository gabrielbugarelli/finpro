import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDTO } from './dtos/authenticate.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async authenticate(
    @Body() authenticateDTO: AuthenticateDTO,
  ): Promise<AuthenticateDTO> {
    return this.authService.authenticate(authenticateDTO);
  }
}
