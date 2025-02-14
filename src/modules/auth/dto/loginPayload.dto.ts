import { ReturnUsersDto } from 'src/modules/users/dto/returnUsers.dto';

export class LoginPayloadDto {
  id: string;
  username: string;

  constructor(returnUsersDto: ReturnUsersDto) {
    this.id = returnUsersDto.id;
    this.username = returnUsersDto.username;
  }
}
