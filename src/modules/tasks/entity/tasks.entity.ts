import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TasksPriority, TasksStatus } from '../enum/tasks.enum';
import { UsersEntity } from 'src/modules/users/entity/users.entity';

@Entity('tasks')
export class TasksEntity {
  @IsString()
  @IsNotEmpty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @Column({ name: 'title', type: 'text', nullable: false })
  title: string;

  @IsString()
  @IsOptional()
  @MinLength(10)
  @MaxLength(2000)
  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @Index()
  @IsEnum(TasksStatus)
  @IsNotEmpty()
  @Column({
    name: 'status',
    type: 'enum',
    enum: TasksStatus,
    default: TasksStatus.PENDING,
    nullable: false,
  })
  status: TasksStatus;

  @Index()
  @IsEnum(TasksPriority)
  @IsNotEmpty()
  @Column({
    name: 'priority',
    type: 'enum',
    enum: TasksPriority,
    default: TasksPriority.MEDIUM,
    nullable: false,
  })
  priority: TasksPriority;

  @Index()
  @IsDateString()
  @IsOptional()
  @Column({ name: 'due_date', nullable: true })
  dueDate: Date;

  @IsArray()
  @IsOptional()
  @Column({ name: 'tags', type: 'text', array: true, nullable: true })
  tags: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => UsersEntity, (user) => user.tasks)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;
}
