import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TasksEntity } from 'src/modules/tasks/entity/tasks.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UsersEntity {
  @IsString()
  @IsNotEmpty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9_.-]+$/, {
    message: 'Use only letters, numbers, ".", "-" or "_"',
  })
  @Column({ name: 'username', unique: true, length: 20, nullable: false })
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(12)
  @MaxLength(100)
  @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Z].{11,}$/, {
    message:
      'Password must begin with an uppercase letter and include at least one lowercase letter, number and special characters',
  })
  @Column({ name: 'password', nullable: false })
  password: string;

  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;

  @OneToMany(() => TasksEntity, (task) => task.user)
  tasks: TasksEntity[];
}
