import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { RolesGuard } from 'src/infra/guard/roles.guard';
import { CreateTasksDto } from './dto/createTasks.dto';
import { UpdateTasksDto } from './dto/updateTasks.dto';
import { ListTasksDto } from './dto/listTasks.dto';
import { ReturnTasksDto } from './dto/returnTasks.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateTaskDoc,
  DeleteTaskDoc,
  FindAllTasksDoc,
  FindOneTaskDoc,
  GetFilteredTasks,
  GetSortedTasks,
  SearchTasksDoc,
  UpdateTaskDoc,
} from './tasks.doc.decorator';

@ApiTags('tasks')
@UseGuards(RolesGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @CreateTaskDoc()
  @Post()
  async createTask(
    @Req() req,
    @Body(new ValidationPipe()) createTasksDto: CreateTasksDto,
  ): Promise<ReturnTasksDto> {
    return this.tasksService.createTask(req.user.id, createTasksDto);
  }

  @FindAllTasksDoc()
  @Get()
  @UsePipes(ValidationPipe)
  async findAllTasks(@Req() req, @Query() listTasksDto: ListTasksDto) {
    const { page, limit } = listTasksDto;
    return this.tasksService.findAllTasks(req.user.id, page, limit);
  }

  @SearchTasksDoc()
  @Get('search')
  @UsePipes(ValidationPipe)
  async searchTasks(
    @Req() req,
    @Query('title') title: string,
  ): Promise<ReturnTasksDto[]> {
    return this.tasksService.searchTasks(req.user.id, title);
  }

  @GetSortedTasks()
  @Get('sorted')
  @UsePipes(ValidationPipe)
  async getSortedTasks(
    @Req() req,
    @Query() listTasksDto: ListTasksDto,
  ): Promise<ReturnTasksDto[]> {
    const { sortBy, order } = listTasksDto;

    return this.tasksService.getSortedTasks(req.user.id, sortBy, order);
  }

  @GetFilteredTasks()
  @Get('filtered')
  @UsePipes(ValidationPipe)
  async getFilteredTasks(@Req() req, @Query() listTaskDto: ListTasksDto) {
    const { sortBy, order, page, limit, search } = listTaskDto;
    return this.tasksService.getFilteredTasks(
      req.user.id,
      sortBy,
      order,
      page,
      limit,
      search,
    );
  }

  @FindOneTaskDoc()
  @Get(':id')
  async findOneTask(
    @Req() req,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ReturnTasksDto> {
    return this.tasksService.findOneTask(req.user.id, id);
  }

  @UpdateTaskDoc()
  @Patch(':id')
  async updateTask(
    @Req() req,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateTasksDto: UpdateTasksDto,
  ): Promise<ReturnTasksDto> {
    return this.tasksService.updateTask(req.user.id, id, updateTasksDto);
  }

  @DeleteTaskDoc()
  @Delete(':id')
  async deleteTask(
    @Req() req,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Object> {
    return this.tasksService.deleteTask(req.user.id, id);
  }
}
