import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'New password',
    type: String,
    required: true,
    example: 'P@ssw0rd4321',
    minLength: 12,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(12)
  @MaxLength(100)
  @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Z].{11,}$/, {
    message:
      'Password must begin with an uppercase letter and include at least one lowercase letter, number, and special characters',
  })
  newPassword: string;

  @ApiProperty({
    description: 'Current password',
    type: String,
    required: true,
    example: 'P@ssw0rd1234',
  })
  @IsString()
  @IsNotEmpty()
  currentPassword: string;
}
