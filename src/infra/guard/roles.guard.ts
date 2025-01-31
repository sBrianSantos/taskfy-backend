import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginPayloadDto } from 'src/modules/auth/dto/loginPayload.dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { authorization } = context.switchToHttp().getRequest().headers;

    if (!authorization) {
      throw new UnauthorizedException('Authorization header not found');
    }

    const loginPayload: LoginPayloadDto | undefined = await this.jwtService
      .verifyAsync(authorization, {
        secret: process.env.JWT_SECRET,
      })
      .catch(() => {
        return undefined;
      });

    if (!loginPayload) {
      return false;
    }

    return true;
  }
}
