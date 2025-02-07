import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './entity/users.entity';
import { RolesGuard } from 'src/infra/guard/roles.guard';
import { UpdateUsersDto } from './dto/updateUsers.dto';

@UseGuards(RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  async getProfile(@Req() req): Promise<UsersEntity> {
    return this.usersService.findOneById(req.user.id);
  }

  @Patch('profile')
  async updateProfile(
    @Req() req,
    @Body(new ValidationPipe()) updateUsersDto: UpdateUsersDto,
  ): Promise<UsersEntity> {
    return this.usersService.updateProfile(req.user.id, updateUsersDto);
  }
}
