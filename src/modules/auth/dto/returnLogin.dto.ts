import { CreateUsersDto } from 'src/modules/users/dto/createUsers.dto';

export class ReturnLoginDto {
  acessToken: string;
  user: CreateUsersDto;
}
