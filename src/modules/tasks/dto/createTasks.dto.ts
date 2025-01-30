import {
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { TasksPriority, TasksStatus } from '../enum/tasks.enum';

export class CreateTasksDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(TasksStatus)
  status: TasksStatus;

  @IsEnum(TasksPriority)
  priority: TasksPriority;

  @IsDateString()
  @IsOptional()
  dueDate: Date;

  @IsArray()
  @IsOptional()
  tags: string[];
}
