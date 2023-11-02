import { Controller, Get, Req } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async me(@Req() request: any): Promise<{ name: string; email: string }> {
    return this.usersService.getUserById(request.userId);
  }
}
