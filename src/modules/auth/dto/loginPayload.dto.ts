import { UsersEntity } from 'src/modules/users/entity/users.entity';

export class LoginPayloadDto {
  id: string;

  constructor(usersEntity: UsersEntity) {
    this.id = usersEntity.id;
  }
}
