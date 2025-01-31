import { UsersEntity } from '../entity/users.entity';

export class ReturnUsersDto {
  id: string;
  username: string;

  constructor(usersEntity: UsersEntity) {
    this.id = usersEntity.id;
    this.username = usersEntity.username;
  }
}
