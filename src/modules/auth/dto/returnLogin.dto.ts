import { ReturnUsersDto } from 'src/modules/users/dto/returnUsers.dto';

export class ReturnLoginDto {
  accessToken: string;
  user: ReturnUsersDto;
}
