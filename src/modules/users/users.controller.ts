import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/createUsers.dto';
import { UsersEntity } from './entity/users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(
    @Body(new ValidationPipe()) createUsersDto: CreateUsersDto,
  ): Promise<UsersEntity> {
    return this.usersService.createUser(createUsersDto);
  }
}
