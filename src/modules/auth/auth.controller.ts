import { Body, Controller, Post, Req, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ReturnLoginDto } from './dto/returnLogin.dto';
import { CreateUsersDto } from '../users/dto/createUsers.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body(new ValidationPipe()) loginDto: LoginDto,
  ): Promise<ReturnLoginDto> {
    return this.authService.login(loginDto);
  }

  @Post('signup')
  async signUp(
    @Body(new ValidationPipe()) createUsersDto: CreateUsersDto,
  ): Promise<ReturnLoginDto> {
    return this.authService.signUp(createUsersDto);
  }

  @Post('logout')
  async logout(@Req() req) {
    const authHeader = req.headers.authorization;

    return this.authService.logout(authHeader);
  }
}
