import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { Order, SortBy } from '../enum/tasks.enum';

export class ListTasksDto {
  @IsOptional()
  @IsEnum(SortBy, {
    message: 'sortBy must be "status", "priority" or "dueDate"',
  })
  sortBy?: SortBy;

  @IsOptional()
  @IsEnum(Order, {
    message: 'order must be "ASC" or "DESC"',
  })
  order?: Order;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => (value ? parseInt(value, 10) : 1))
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => (value ? parseInt(value, 10) : 10))
  limit?: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.toLowerCase())
  search?: string;
}
