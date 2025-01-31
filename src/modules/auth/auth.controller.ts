import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ReturnLoginDto } from './dto/returnLogin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(
    @Body(new ValidationPipe()) loginDto: LoginDto,
  ): Promise<ReturnLoginDto> {
    return this.authService.login(loginDto);
  }
}
