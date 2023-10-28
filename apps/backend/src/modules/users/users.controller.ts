import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDTO: CreateUserDTO): Promise<CreateUserDTO> {
    return await this.usersService.create(createUserDTO);
  }
}
