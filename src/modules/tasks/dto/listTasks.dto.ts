import { IsEnum, IsOptional } from 'class-validator';
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

  // @IsOptional()
  // @Transform(({ value }) => parseInt(value, 10))
  // page?: number;

  // @IsOptional()
  // @Transform(({ value }) => parseInt(value, 10))
  // limit?: number;
}
