import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/infra/guard/roles.guard';
import { UpdateUsersDto } from './dto/updateUsers.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { DeleteUsersDto } from './dto/deleteUsers.dto';
import { ReturnUsersDto } from './dto/returnUsers.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  ChangePasswordDoc,
  DeleteUsersDoc,
  GetProfileDoc,
  UpdateProfileDoc,
} from './users.doc.decorator';

@ApiTags('users')
@UseGuards(RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GetProfileDoc()
  @Get('profile')
  async getProfile(@Req() req): Promise<ReturnUsersDto> {
    return this.usersService.findOneById(req.user.id);
  }

  @UpdateProfileDoc()
  @Patch('profile')
  async updateProfile(
    @Req() req,
    @Body(new ValidationPipe()) updateUsersDto: UpdateUsersDto,
  ): Promise<ReturnUsersDto> {
    return this.usersService.updateProfile(req.user.id, updateUsersDto);
  }

  @ChangePasswordDoc()
  @HttpCode(200)
  @Post('change-password')
  async changePassword(
    @Req() req,
    @Body(new ValidationPipe()) changePasswordDto: ChangePasswordDto,
  ): Promise<Object> {
    return this.usersService.changePassword(req.user.id, changePasswordDto);
  }

  @DeleteUsersDoc()
  @Delete('delete')
  async DeleteUsersDto(
    @Req() req,
    @Body(new ValidationPipe()) deleteUsersDto: DeleteUsersDto,
  ): Promise<Object> {
    const token = req.headers.authorization.replace('Bearer ', '');

    return this.usersService.deleteUser(req.user.id, deleteUsersDto, token);
  }
}
