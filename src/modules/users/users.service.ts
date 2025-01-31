import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersEntity } from './entity/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsersDto } from './dto/createUsers.dto';
import { PasswordService } from 'src/service/password.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private readonly passwordService: PasswordService,
  ) {}

  async createUser(createUsersDto: CreateUsersDto): Promise<UsersEntity> {
    const hash = await this.passwordService.generateHash(
      createUsersDto.password,
    );

    const user = await this.usersRepository
      .save({
        ...createUsersDto,
        password: hash,
      })
      .catch((error) => {
        if (error.code == '23505') {
          throw new ConflictException('Username already registered');
        }
        throw error;
      });

    return user;
  }

  async findOneById(id: string): Promise<UsersEntity> {
    const user = await this.usersRepository
      .findOne({
        where: { id },
      })
      .catch(() => {
        throw new NotFoundException('User not found');
      });

    return user;
  }

  async findOneByUsername(username: string): Promise<UsersEntity> {
    const user = await this.usersRepository
      .findOne({
        where: { username },
      })
      .catch(() => {
        throw new NotFoundException('User not found');
      });

    return user;
  }
}
