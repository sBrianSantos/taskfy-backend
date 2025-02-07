import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @MinLength(12)
  @MaxLength(100)
  @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Z].{11,}$/, {
    message:
      'Password must begin with an uppercase letter and include at least one lowercase letter, number, and special characters',
  })
  newPassword: string;

  @IsString()
  currentPassword: string;
}
