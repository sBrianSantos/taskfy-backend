import {
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { TasksPriority, TasksStatus } from '../enum/tasks.enum';

export class UpdateTasksDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
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
