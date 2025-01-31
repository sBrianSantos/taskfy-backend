import {
  BadRequestException,
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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksEntity } from './entity/tasks.entity';
import { CreateTasksDto } from './dto/createTasks.dto';
import { UpdateTasksDto } from './dto/updateTasks.dto';
import { RolesGuard } from 'src/infra/guard/roles.guard';
import { Order, SortBy } from './enum/tasks.enum';
import { ListTasksDto } from './dto/listTasks.dto';

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
  async findAllTasks(@Req() req, @Query() listTasksDto: ListTasksDto) {
    const { page, limit } = listTasksDto;
    return this.tasksService.findAllTasks(req.user.id, page, limit);
  }

  @Get('search')
  async searchTasks(
    @Req() req,
    @Query('title') title: string,
  ): Promise<TasksEntity[]> {
    return this.tasksService.searchTasks(req.user.id, title);
  }

  @Get('sorted')
  @UsePipes(ValidationPipe)
  async getSortedTasks(
    @Req() req,
    @Query() listTasksDto: ListTasksDto,
  ): Promise<TasksEntity[]> {
    const { sortBy, order } = listTasksDto;
    return this.tasksService.getSortedTasks(req.user.id, sortBy, order);
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
