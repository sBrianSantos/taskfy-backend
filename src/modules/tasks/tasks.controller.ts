import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
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
    @Req() req,
    @Body(new ValidationPipe()) createTasksDto: CreateTasksDto,
  ): Promise<TasksEntity> {
    return this.tasksService.createTask(req.user.id, createTasksDto);
  }

  @Get()
  async findAllTasks(@Req() req): Promise<TasksEntity[]> {
    return this.tasksService.findAllTasks(req.user.id);
  }

  @Get('search')
  async searchTasks(
    @Req() req,
    @Query('title') title: string,
  ): Promise<TasksEntity[]> {
    return this.tasksService.searchTasks(req.user.id, title);
  }

  @Get(':id')
  async findOneTask(@Req() req, @Param('id') id: string): Promise<TasksEntity> {
    return this.tasksService.findOneTask(req.user.id, id);
  }

  @Patch(':id')
  async updateTask(
    @Req() req,
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateTasksDto: UpdateTasksDto,
  ): Promise<TasksEntity> {
    return this.tasksService.updateTask(req.user.id, id, updateTasksDto);
  }

  @Delete(':id')
  async deleteTask(@Req() req, @Param('id') id: string): Promise<Object> {
    return this.tasksService.deleteTask(req.user.id, id);
  }
}
