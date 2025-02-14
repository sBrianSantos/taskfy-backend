import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteUsersDto {
  @ApiProperty({
    description: 'Password',
    type: String,
    required: true,
    example: 'P@ssw0rd1234',
  })
  @IsString()
  @IsNotEmpty()
  confirmationPassword: string;
}
