import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PasswordService } from 'src/service/password.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { ReturnLoginDto } from './dto/returnLogin.dto';
import { LoginPayloadDto } from './dto/loginPayload.dto';
import { ReturnUsersDto } from '../users/dto/returnUsers.dto';
import { CreateUsersDto } from '../users/dto/createUsers.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
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
      throw new NotFoundException(`Username or password invalid`);
    }

    const payload = new LoginPayloadDto(user);
    const accessToken = this.jwtService.sign({ ...payload });

    return {
      accessToken,
      user: new ReturnUsersDto(user),
    };
  }

  async signUp(createUsersDto: CreateUsersDto): Promise<ReturnLoginDto> {
    const user = await this.usersService.createUser(createUsersDto);

    const payload = new LoginPayloadDto(user);
    const accessToken = this.jwtService.sign({ ...payload });

    return {
      accessToken,
      user: new ReturnUsersDto(user),
    };
  }
}
