import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUsersDto {
  @ApiPropertyOptional({
    description: 'Username',
    type: String,
    required: true,
    example: 'brian_s',
    minLength: 3,
    maxLength: 20,
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9_.-]+$/, {
    message: 'Use only letters, numbers, ".", "-" or "_"',
  })
  username: string;
}
