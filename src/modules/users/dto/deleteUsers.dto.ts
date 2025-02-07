import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteUsersDto {
  @IsString()
  @IsNotEmpty()
  confirmationPassword: string;
}
