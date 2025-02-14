import {
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
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
  @IsNumberString()
  @Min(1)
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(1)
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.toLowerCase())
  search?: string;
}
