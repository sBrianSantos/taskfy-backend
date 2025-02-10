import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entity/users.entity';
import { PasswordService } from 'src/service/password.service';
import { TokenBlacklistService } from 'src/service/tokenBlacklist.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UsersController],
  providers: [UsersService, PasswordService, TokenBlacklistService],
  exports: [UsersService],
})
export class UsersModule {}
