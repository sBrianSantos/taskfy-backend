import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUsersDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9_.-]+$/, {
    message: 'Use only letters, numbers, ".", "-" or "_"',
  })
  username: string;
}
