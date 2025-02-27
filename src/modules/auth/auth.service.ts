import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PasswordService } from 'src/service/password.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { ReturnLoginDto } from './dto/returnLogin.dto';
import { LoginPayloadDto } from './dto/loginPayload.dto';
import { CreateUsersDto } from '../users/dto/createUsers.dto';
import { TokenBlacklistService } from 'src/service/tokenBlacklist.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly tokenBlacklistService: TokenBlacklistService,
  ) {}

  async login(loginDto: LoginDto): Promise<ReturnLoginDto> {
    const user = await this.usersService
      .findOneByUsername(loginDto.username)
      .catch(() => undefined);

    if (
      !user ||
      !(await this.passwordService.validatePassword(
        loginDto.password,
        user.password,
      ))
    ) {
      throw new NotFoundException('Username or password invalid');
    }

    const payload = new LoginPayloadDto(user);
    const accessToken = this.jwtService.sign({ ...payload });

    return {
      accessToken,
    };
  }

  async signUp(createUsersDto: CreateUsersDto): Promise<ReturnLoginDto> {
    const user = await this.usersService.createUser(createUsersDto);

    const payload = new LoginPayloadDto(user);
    const accessToken = this.jwtService.sign({ ...payload });

    return {
      accessToken,
    };
  }

  logout(authHeader: string): { message: string } {
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header not found');
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new UnauthorizedException('Invalid authorization header format');
    }

    const token = parts[1];
    this.tokenBlacklistService.add(token, 3600);

    return { message: 'Logout completed successfully' };
  }

  async validateToken(authHeader: string): Promise<{ valid: boolean }> {
    if (!authHeader) {
      throw new UnauthorizedException('Invalid authorization header format');
    }

    const token = authHeader.replace('Bearer ', '');
    try {
      this.jwtService.verify(token);
      return { valid: true };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
