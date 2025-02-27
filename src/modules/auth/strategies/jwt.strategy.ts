import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/modules/users/users.service';
import { TokenBlacklistService } from 'src/service/tokenBlacklist.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly tokenBlacklistService: TokenBlacklistService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(req: any, payload: any): Promise<any> {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    const user = await this.usersService.findOneByUsername(payload.sub);

    if (this.tokenBlacklistService.isBlacklisted(token)) {
      throw new UnauthorizedException(
        'Invalid token (logged out or user deleted)',
      );
    }

    if (!user) {
      throw new UnauthorizedException('User not found or inactive');
    }

    return user;
  }
}
