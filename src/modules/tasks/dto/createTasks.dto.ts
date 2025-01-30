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

export class CreateTasksDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @IsString()
  @IsOptional()
  @MinLength(10)
  @MaxLength(2000)
  description: string;

  @IsEnum(TasksStatus)
  @IsNotEmpty()
  status: TasksStatus;

  @IsEnum(TasksPriority)
  @IsNotEmpty()
  priority: TasksPriority;

  @IsDateString()
  @IsOptional()
  dueDate: Date;

  @IsArray()
  @IsOptional()
  tags: string[];
}
