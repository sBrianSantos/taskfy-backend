import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ReturnLoginDto } from './dto/returnLogin.dto';
import { CreateUsersDto } from '../users/dto/createUsers.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Login user',
    description:
      'Endpoint for user login. The body of the request must contain mandatory fields such as username and password.',
    operationId: 'login',
    deprecated: false,
  })
  @ApiBody({
    type: LoginDto,
    description: 'User login data',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    type: ReturnLoginDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Username or password invalid format or length',
    example: {
      message: [
        'Use only letters, numbers, ".", "-" or "_"',
        'username must be shorter than or equal to 20 characters',
        'username must be longer than or equal to 3 characters',
        'username must be a string',
        'username should not be empty',
        'Password must begin with an uppercase letter and include at least one lowercase letter, number and special characters',
        'password must be shorter than or equal to 100 characters',
        'password must be longer than or equal to 12 characters',
        'password must be a string',
        'password should not be empty',
        'Unexpected token \',\', ..."sername": ,\r\n    "pa"... is not valid JSON',
      ],
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Username or password invalid',
    example: {
      message: 'Username or password invalid',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @HttpCode(200)
  @Post('login')
  async login(
    @Body(new ValidationPipe()) loginDto: LoginDto,
  ): Promise<ReturnLoginDto> {
    return this.authService.login(loginDto);
  }

  @ApiOperation({
    summary: 'Sign up user',
    description:
      'Endpoint for user registration. The body of the request must contain mandatory fields such as username and password.',
    operationId: 'signup',
    deprecated: false,
  })
  @ApiBody({
    type: CreateUsersDto,
    description: 'User registration data',
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: ReturnLoginDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Username or password invalid format or length',
    example: {
      message: [
        'Use only letters, numbers, ".", "-" or "_"',
        'username must be shorter than or equal to 20 characters',
        'username must be longer than or equal to 3 characters',
        'username must be a string',
        'username should not be empty',
        'Password must begin with an uppercase letter and include at least one lowercase letter, number and special characters',
        'password must be shorter than or equal to 100 characters',
        'password must be longer than or equal to 12 characters',
        'password must be a string',
        'password should not be empty',
        'Unexpected token \',\', ..."sername": ,\r\n    "pa"... is not valid JSON',
      ],
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Username is already taken',
    example: {
      message: 'Username is already taken',
      error: 'Conflict',
      statusCode: 409,
    },
  })
  @Post('signup')
  async signUp(
    @Body(new ValidationPipe()) createUsersDto: CreateUsersDto,
  ): Promise<ReturnLoginDto> {
    return this.authService.signUp(createUsersDto);
  }

  @ApiOperation({
    summary: 'Logout user',
    description:
      'Endpoint for user login. The Authorization Bearer of the request must contain the Access Token.',
    operationId: 'logout',
    deprecated: false,
  })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Formatless Access Token: Bearer {token}',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Logout completed successfully',
    example: {
      message: 'Logout completed successfully',
    },
  })
  @ApiResponse({
    status: 401,
    description:
      'Invalid authorization header format or Authorization header not found',
    example: {
      message:
        'Invalid authorization header format or Authorization header not found',
      error: 'Unauthorized',
      statusCode: 401,
    },
  })
  @HttpCode(200)
  @Post('logout')
  async logout(@Req() req) {
    const authHeader = req.headers.authorization;

    return this.authService.logout(authHeader);
  }
}
