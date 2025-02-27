import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ReturnLoginDto } from './dto/returnLogin.dto';
import { CreateUsersDto } from '../users/dto/createUsers.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  LoginDoc,
  LogoutDoc,
  SignUpDoc,
  ValidateTokenDoc,
} from './auth.doc.decorator';
import { RolesGuard } from 'src/infra/guard/roles.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @LoginDoc()
  @HttpCode(200)
  @Post('login')
  async login(
    @Body(new ValidationPipe()) loginDto: LoginDto,
  ): Promise<ReturnLoginDto> {
    return this.authService.login(loginDto);
  }

  @SignUpDoc()
  @Post('signup')
  async signUp(
    @Body(new ValidationPipe()) createUsersDto: CreateUsersDto,
  ): Promise<ReturnLoginDto> {
    return this.authService.signUp(createUsersDto);
  }

  @LogoutDoc()
  @HttpCode(200)
  @Post('logout')
  async logout(@Req() req) {
    const authHeader = req.headers.authorization;

    return this.authService.logout(authHeader);
  }

  @ValidateTokenDoc()
  @HttpCode(200)
  @Post('validate-token')
  async validateToken(@Req() req) {
    const authHeader = req.headers.authorization;

    return this.authService.validateToken(authHeader);
  }
}
