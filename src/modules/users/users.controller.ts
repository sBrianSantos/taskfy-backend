import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './entity/users.entity';
import { RolesGuard } from 'src/infra/guard/roles.guard';
import { UpdateUsersDto } from './dto/updateUsers.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { DeleteUsersDto } from './dto/deleteUsers.dto';

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

  @Post('change-password')
  async changePassword(
    @Req() req,
    @Body(new ValidationPipe()) changePasswordDto: ChangePasswordDto,
  ): Promise<Object> {
    return this.usersService.changePassword(req.user.id, changePasswordDto);
  }

  @Delete('delete')
  async DeleteUsersDto(
    @Req() req,
    @Body(new ValidationPipe()) deleteUsersDto: DeleteUsersDto,
  ): Promise<Object> {
    return this.usersService.deleteUser(req.user.id, deleteUsersDto);
  }
}
