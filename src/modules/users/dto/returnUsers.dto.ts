import { ApiProperty } from '@nestjs/swagger';
import { UsersEntity } from '../entity/users.entity';

export class ReturnUsersDto {
  @ApiProperty({
    description: 'User ID',
    type: String,
    required: true,
    example: 'b5e7e9a9-8d0d-4e0b-9c6b-0e9b1f3b1e4a',
  })
  id: string;

  @ApiProperty({
    description: 'Username',
    type: String,
    required: true,
    example: 'brian_s',
  })
  username: string;

  @ApiProperty({
    description: 'User creation date',
    type: Date,
    required: true,
    example: '2021-06-21T00:00:00.000Z',
  })
  createAt: Date;

  @ApiProperty({
    description: 'User update date',
    type: Date,
    required: true,
    example: '2021-06-21T00:00:00.000Z',
  })
  updateAt: Date;

  constructor(usersEntity: UsersEntity) {
    this.id = usersEntity.id;
    this.username = usersEntity.username;
    this.createAt = usersEntity.createAt;
    this.updateAt = usersEntity.updateAt;
  }
}
