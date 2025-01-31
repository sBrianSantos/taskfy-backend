import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksEntity } from './entity/tasks.entity';
import { CreateTasksDto } from './dto/createTasks.dto';
import { UpdateTasksDto } from './dto/updateTasks.dto';
import { RolesGuard } from 'src/infra/guard/roles.guard';

@UseGuards(RolesGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(
    @Body(new ValidationPipe()) createTasksDto: CreateTasksDto,
  ): Promise<TasksEntity> {
    return this.tasksService.createTask(createTasksDto);
  }

  @Get()
  async findAllTasks(): Promise<TasksEntity[]> {
    return this.tasksService.findAllTasks();
  }

  @Get(':id')
  async findOneTask(@Param('id') id: string): Promise<TasksEntity> {
    return this.tasksService.findOneTask(id);
  }

  @Patch(':id')
  async updateTask(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateTasksDto: UpdateTasksDto,
  ): Promise<TasksEntity> {
    return this.tasksService.updateTask(id, updateTasksDto);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<Object> {
    return this.tasksService.deleteTask(id);
  }
}
