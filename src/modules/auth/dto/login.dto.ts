import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9_.-]+$/, {
    message: 'Use only letters, numbers, ".", "-" or "_"',
  })
  username: string;

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
