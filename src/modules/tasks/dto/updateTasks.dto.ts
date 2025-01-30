import {
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TasksPriority, TasksStatus } from '../enum/tasks.enum';

export class UpdateTasksDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(100)
  title?: string;

  @IsString()
  @IsOptional()
  @MinLength(10)
  @MaxLength(2000)
  description?: string;

  @IsEnum(TasksStatus)
  @IsOptional()
  status?: TasksStatus;

  @IsEnum(TasksPriority)
  @IsOptional()
  priority?: TasksPriority;

  @IsDateString()
  @IsOptional()
  dueDate?: Date;

  @IsArray()
  @IsOptional()
  tags?: string[];
}
