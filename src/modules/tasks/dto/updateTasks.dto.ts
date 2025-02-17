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
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTasksDto {
  @ApiPropertyOptional({
    description: 'Title of the task',
    type: String,
    example: 'Example task',
    minLength: 3,
    maxLength: 100,
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(100)
  title?: string;

  @ApiPropertyOptional({
    description: 'Description of the task',
    type: String,
    example: 'This is an example task',
    minLength: 10,
    maxLength: 2000,
  })
  @IsString()
  @IsOptional()
  @MinLength(10)
  @MaxLength(2000)
  description?: string;

  @ApiPropertyOptional({
    description: 'Status of the task',
    type: String,
    enum: TasksStatus,
    required: true,
    example: 'in_progress',
  })
  @IsEnum(TasksStatus)
  @IsOptional()
  status?: TasksStatus;

  @ApiPropertyOptional({
    description: 'Priority of the task',
    type: String,
    enum: TasksPriority,
    required: true,
    example: 'low',
  })
  @IsEnum(TasksPriority)
  @IsOptional()
  priority?: TasksPriority;

  @ApiPropertyOptional({
    description: 'Due date of the task',
    type: String,
    example: '2025-02-14',
  })
  @IsDateString()
  @IsOptional()
  dueDate?: Date;

  @ApiPropertyOptional({
    description: 'Tags of the task',
    type: [String],
    example: ['tag1', 'tag2'],
  })
  @IsArray()
  @IsOptional()
  tags?: string[];
}
