import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUsersDto {
  @ApiProperty({
    description: 'Username',
    type: String,
    required: true,
    example: 'brian_s',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9_.-]+$/, {
    message: 'Use only letters, numbers, ".", "-" or "_"',
  })
  username: string;

  @ApiProperty({
    description: 'Password',
    type: String,
    required: true,
    example: 'P@ssw0rd1234',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(12)
  @MaxLength(100)
  @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Z].{11,}$/, {
    message:
      'Password must begin with an uppercase letter and include at least one lowercase letter, number and special characters',
  })
  password: string;
}
