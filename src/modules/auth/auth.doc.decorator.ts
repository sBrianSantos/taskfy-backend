import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { ReturnLoginDto } from './dto/returnLogin.dto';
import { CreateUsersDto } from '../users/dto/createUsers.dto';

export const LoginDoc = () =>
  applyDecorators(
    ...[
      ApiOperation({
        summary: 'Login user',
        description:
          'Endpoint for user login. The body of the request must contain mandatory fields such as username and password.',
        operationId: 'login',
        deprecated: false,
      }),
      ApiBody({
        type: LoginDto,
        description: 'User login data',
        required: true,
      }),
      ApiResponse({
        status: 200,
        description: 'User logged in successfully',
        type: ReturnLoginDto,
      }),
      ApiResponse({
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
      }),
      ApiResponse({
        status: 404,
        description: 'Username or password invalid',
        example: {
          message: 'Username or password invalid',
          error: 'Not Found',
          statusCode: 404,
        },
      }),
    ],
  );

export const SignUpDoc = () =>
  applyDecorators(
    ...[
      ApiOperation({
        summary: 'Sign up user',
        description:
          'Endpoint for user registration. The body of the request must contain mandatory fields such as username and password.',
        operationId: 'signup',
        deprecated: false,
      }),
      ApiBody({
        type: CreateUsersDto,
        description: 'User registration data',
        required: true,
      }),
      ApiResponse({
        status: 201,
        description: 'User registered successfully',
        type: ReturnLoginDto,
      }),
      ApiResponse({
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
      }),
      ApiResponse({
        status: 409,
        description: 'Username is already taken',
        example: {
          message: 'Username is already taken',
          error: 'Conflict',
          statusCode: 409,
        },
      }),
    ],
  );

export const LogoutDoc = () =>
  applyDecorators(
    ...[
      ApiOperation({
        summary: 'Logout user',
        description:
          'Endpoint for user login. The Authorization Bearer of the request must contain the Access Token.',
        operationId: 'logout',
        deprecated: false,
      }),
      ApiBearerAuth(),
      ApiHeader({
        name: 'Authorization',
        description: 'Formatless Access Token: Bearer {token}',
        required: true,
      }),
      ApiResponse({
        status: 200,
        description: 'Logout completed successfully',
        example: {
          message: 'Logout completed successfully',
        },
      }),
      ApiResponse({
        status: 401,
        description:
          'Invalid authorization header format or Authorization header not found',
        examples: {
          InvalidAuthorizationHeader: {
            summary: 'Invalid authorization header format',
            value: {
              message: 'Invalid authorization header format',
              error: 'Unauthorized',
              statusCode: 401,
            },
          },
          AuthorizationHeaderNotFound: {
            summary: 'Authorization header not found',
            value: {
              message: 'Authorization header not found',
              error: 'Unauthorized',
              statusCode: 401,
            },
          },
        },
      }),
    ],
  );
