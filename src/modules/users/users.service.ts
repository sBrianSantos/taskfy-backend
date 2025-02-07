import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersEntity } from './entity/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsersDto } from './dto/createUsers.dto';
import { PasswordService } from 'src/service/password.service';
import { UpdateUsersDto } from './dto/updateUsers.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { DeleteUsersDto } from './dto/deleteUsers.dto';

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
          throw new ConflictException('Username is already taken');
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

  async updateProfile(
    userId: string,
    updateUsersDto: UpdateUsersDto,
  ): Promise<UsersEntity> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUsersDto.username) {
      const existingUser = await this.usersRepository.findOne({
        where: { username: updateUsersDto.username },
      });

      if (existingUser && existingUser.id !== userId) {
        throw new ConflictException('Username is already taken');
      }

      user.username = updateUsersDto.username;
    }

    return await this.usersRepository.save(user);
  }

  async changePassword(
    userId: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<Object> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { newPassword, currentPassword } = changePasswordDto;

    const isPasswordValid = await this.passwordService.validatePassword(
      currentPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    user.password = await this.passwordService.generateHash(newPassword);

    await this.usersRepository.save(user);

    return { message: 'Your password has been changed successfully' };
  }

  async deleteUser(
    userId: string,
    deleteUsersDto: DeleteUsersDto,
  ): Promise<Object> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await this.passwordService.validatePassword(
      deleteUsersDto.confirmationPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    await this.usersRepository.remove(user);

    return { message: 'Account deactivated successfully.' };
  }
}
