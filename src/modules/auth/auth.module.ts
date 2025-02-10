import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { PasswordService } from 'src/service/password.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { RolesGuard } from 'src/infra/guard/roles.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TokenBlacklistService } from 'src/service/tokenBlacklist.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PasswordService,
    RolesGuard,
    JwtStrategy,
    TokenBlacklistService,
  ],
  exports: [JwtStrategy, PassportModule, RolesGuard],
})
export class AuthModule {}
