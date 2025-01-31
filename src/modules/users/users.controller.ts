import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './entity/users.entity';
import { RolesGuard } from 'src/infra/guard/roles.guard';

@UseGuards(RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  async getProfile(@Req() req): Promise<UsersEntity> {
    return this.usersService.findOneById(req.user.id);
  }
}
