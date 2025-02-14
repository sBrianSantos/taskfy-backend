import { ApiProperty } from '@nestjs/swagger';
import { TasksEntity } from '../entity/tasks.entity';

export class ReturnTasksDto {
  @ApiProperty({
    description: 'Task ID',
    type: String,
    required: true,
    example: '9f727cc4-2135-4dda-aa2a-c61e0ebe3de2',
  })
  id: string;

  @ApiProperty({
    description: 'Title of the task',
    type: String,
    required: true,
    example: 'Example task',
  })
  title: string;

  @ApiProperty({
    description: 'Description of the task',
    type: String,
    example: 'This is an example task',
  })
  description: string;

  @ApiProperty({
    description: 'Status of the task',
    type: String,
    required: true,
    example: 'in_progress',
  })
  status: string;

  @ApiProperty({
    description: 'Priority of the task',
    type: String,
    required: true,
    example: 'low',
  })
  priority: string;

  @ApiProperty({
    description: 'Due date of the task',
    type: String,
    required: true,
    example: '2025-06-24T03:00:00.000Z',
  })
  dueDate: Date;

  @ApiProperty({
    description: 'Tags of the task',
    type: [String],
    required: true,
    example: ['tag1', 'tag2'],
  })
  tags: string[];

  @ApiProperty({
    description: 'Task creation date',
    type: Date,
    required: true,
    example: '2025-02-14T22:23:10.598Z',
  })
  createAt: Date;

  @ApiProperty({
    description: 'Task update date',
    type: Date,
    required: true,
    example: '2025-02-14T22:23:10.598Z',
  })
  updateAt: Date;

  constructor(tasksEntity: TasksEntity) {
    this.id = tasksEntity.id;
    this.title = tasksEntity.title;
    this.description = tasksEntity.description;
    this.status = tasksEntity.status;
    this.priority = tasksEntity.priority;
    this.dueDate = tasksEntity.dueDate;
    this.tags = tasksEntity.tags;
    this.createAt = tasksEntity.createdAt;
    this.updateAt = tasksEntity.updatedAt;
  }
}
