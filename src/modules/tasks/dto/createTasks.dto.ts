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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTasksDto {
  @ApiProperty({
    description: 'Title of the task',
    type: String,
    required: true,
    example: 'Example task',
    minLength: 3,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  title: string;

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
  description: string;

  @ApiProperty({
    description: 'Status of the task',
    type: String,
    enum: TasksStatus,
    required: true,
    example: 'in_progress',
  })
  @IsEnum(TasksStatus)
  @IsNotEmpty()
  status: TasksStatus;

  @ApiProperty({
    description: 'Priority of the task',
    type: String,
    enum: TasksPriority,
    required: true,
    example: 'low',
  })
  @IsEnum(TasksPriority)
  @IsNotEmpty()
  priority: TasksPriority;

  @ApiPropertyOptional({
    description: 'Due date of the task',
    type: String,
    example: '2025-02-14',
  })
  @IsDateString()
  @IsOptional()
  dueDate: Date;

  @ApiPropertyOptional({
    description: 'Tags of the task',
    type: [String],
    example: ['tag1', 'tag2'],
  })
  @IsArray()
  @IsOptional()
  tags: string[];
}
