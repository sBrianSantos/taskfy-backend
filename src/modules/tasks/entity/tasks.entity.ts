import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TasksPriority, TasksStatus } from '../enum/tasks.enum';

@Entity('tasks')
export class TasksEntity {
  @IsNumber()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @Column({ name: 'title', nullable: false })
  title: string;

  @IsString()
  @IsOptional()
  @Column({ name: 'description', nullable: true })
  description: string;

  @Index()
  @IsEnum(TasksStatus)
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
}
