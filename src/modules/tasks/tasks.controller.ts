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
import { CreateTasksDto } from './dto/createTasks.dto';
import { UpdateTasksDto } from './dto/updateTasks.dto';
import { RolesGuard } from 'src/infra/guard/roles.guard';
import { ListTasksDto } from './dto/listTasks.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ReturnTasksDto } from './dto/returnTasks.dto';

@ApiTags('tasks')
@UseGuards(RolesGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({
    summary: 'Create a new task',
    description:
      'Endpoint for creating a new task. The Authorization Bearer of the request must contain the Access Token and the request body must contain mandatory fields such as title, status and priority, and optional fields such as description, dueDate and tags',
    operationId: 'createTask',
    deprecated: false,
  })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Formatless Access Token: Bearer {token}',
    required: true,
  })
  @ApiBody({
    type: CreateTasksDto,
    description: 'Task information to be created',
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: 'Task created successfully',
    type: ReturnTasksDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid format or length',
    example: {
      message: [
        'title must be shorter than or equal to 100 characters',
        'title must be longer than or equal to 3 characters',
        'title must be a string',
        'title should not be empty',
        'description must be shorter than or equal to 2000 characters',
        'description must be longer than or equal to 10 characters',
        'description must be a string',
        'status should not be empty',
        'status must be one of the following values: pending, in_progress, completed',
        'priority should not be empty',
        'priority must be one of the following values: low, medium, high',
        'dueDate must be a valid ISO 8601 date string',
        'tags must be an array',
        'Unexpected token \',\', ..." "title": ,\r\n    "de"... is not valid JSON',
      ],
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access',
    example: {
      message: 'Unauthorized access',
      error: 'Unauthorized',
      statusCode: 401,
    },
  })
  @Post()
  async createTask(
    @Req() req,
    @Body(new ValidationPipe()) createTasksDto: CreateTasksDto,
  ): Promise<ReturnTasksDto> {
    return this.tasksService.createTask(req.user.id, createTasksDto);
  }

  @ApiOperation({
    summary: 'List all tasks',
    description:
      'Endpoint for listing all tasks. The Authorization Bearer of the request must contain the Access Token and the request query can contain optional fields such as page and limit',
  })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Formatless Access Token: Bearer {token}',
    required: true,
  })
  @ApiQuery({
    name: 'page',
    description: 'Page number',
    type: Number,
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Number of tasks per page',
    type: Number,
    required: false,
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'List of tasks',
    type: [ReturnTasksDto],
    example: {
      tasks: [
        {
          id: '9f727cc4-2135-4dda-aa2a-c61e0ebe3de2',
          title: 'Example task',
          description: 'This is an example task',
          status: 'in_progress',
          priority: 'low',
          dueDate: '2025-06-24T03:00:00.000Z',
          tags: ['tag1', 'tag2'],
          createAt: '2021-06-24T03:00:00.000Z',
          updateAt: '2021-06-24T03:00:00.000Z',
        },
      ],
      total: 1,
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid format or length',
    example: {
      message: [
        'page must not be less than 1',
        'page must be a number string',
        'limit must not be less than 1',
        'limit must be a number conforming to the specified constraints',
      ],
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access',
    example: {
      message: 'Unauthorized access',
      error: 'Unauthorized',
      statusCode: 401,
    },
  })
  @Get()
  @UsePipes(ValidationPipe)
  async findAllTasks(@Req() req, @Query() listTasksDto: ListTasksDto) {
    const { page, limit } = listTasksDto;
    return this.tasksService.findAllTasks(req.user.id, page, limit);
  }

  @ApiOperation({
    summary: 'Search tasks',
    description:
      'Endpoint for searching tasks. The Authorization Bearer of the request must contain the Access Token and the request query can contain optional fields such as title',
    operationId: 'searchTasks',
    deprecated: false,
  })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Formatless Access Token: Bearer {token}',
    required: true,
  })
  @ApiQuery({
    name: 'title',
    description: 'Task title',
    type: String,
    required: false,
    example: 'Example task',
  })
  @ApiResponse({
    status: 200,
    description: 'List of tasks',
    type: [ReturnTasksDto],
    example: [
      {
        id: '9f727cc4-2135-4dda-aa2a-c61e0ebe3de2',
        title: 'Example task',
        description: 'This is an example task',
        status: 'in_progress',
        priority: 'low',
        dueDate: '2025-06-24T03:00:00.000Z',
        tags: ['tag1', 'tag2'],
        createAt: '2021-06-24T03:00:00.000Z',
        updateAt: '2021-06-24T03:00:00.000Z',
      },
    ],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access',
    example: {
      message: 'Unauthorized access',
      error: 'Unauthorized',
      statusCode: 401,
    },
  })
  @Get('search')
  @UsePipes(ValidationPipe)
  async searchTasks(
    @Req() req,
    @Query('title') title: string,
  ): Promise<ReturnTasksDto[]> {
    return this.tasksService.searchTasks(req.user.id, title);
  }

  @ApiOperation({
    summary: 'List tasks sorted',
    description:
      'Endpoint for listing tasks sorted. The Authorization Bearer of the request must contain the Access Token and the request query can contain optional fields such as sortBy and order',
    operationId: 'getSortedTasks',
    deprecated: false,
  })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Formatless Access Token: Bearer {token}',
    required: true,
  })
  @ApiQuery({
    name: 'sortBy',
    description: 'Sort by',
    type: String,
    required: false,
    example: 'low',
  })
  @ApiQuery({
    name: 'order',
    description: 'Order',
    type: String,
    required: false,
    example: 'asc',
  })
  @ApiResponse({
    status: 200,
    description: 'List of tasks',
    type: [ReturnTasksDto],
    example: [
      {
        id: '9f727cc4-2135-4dda-aa2a-c61e0ebe3de2',
        title: 'Example task',
        description: 'This is an example task',
        status: 'in_progress',
        priority: 'low',
        dueDate: '2025-06-24T03:00:00.000Z',
        tags: ['tag1', 'tag2'],
        createAt: '2021-06-24T03:00:00.000Z',
        updateAt: '2021-06-24T03:00:00.000Z',
      },
    ],
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid format or length',
    example: {
      message: [
        'sortBy must be "status", "priority" or "dueDate"',
        'order must be "ASC" or "DESC"',
      ],
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access',
    example: {
      message: 'Unauthorized access',
      error: 'Unauthorized',
      statusCode: 401,
    },
  })
  @Get('sorted')
  @UsePipes(ValidationPipe)
  async getSortedTasks(
    @Req() req,
    @Query() listTasksDto: ListTasksDto,
  ): Promise<ReturnTasksDto[]> {
    const { sortBy, order } = listTasksDto;

    return this.tasksService.getSortedTasks(req.user.id, sortBy, order);
  }

  @ApiOperation({
    summary: 'List tasks filtered',
    description:
      'Endpoint for listing tasks filtered. The Authorization Bearer of the request must contain the Access Token and the request query can contain optional fields such as sortBy, order, page, limit and search',
    operationId: 'getFilteredTasks',
    deprecated: false,
  })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Formatless Access Token: Bearer {token}',
    required: true,
  })
  @ApiQuery({
    name: 'sortBy',
    description: 'Sort by',
    type: String,
    required: false,
    example: 'low',
  })
  @ApiQuery({
    name: 'order',
    description: 'Order',
    type: String,
    required: false,
    example: 'asc',
  })
  @ApiQuery({
    name: 'page',
    description: 'Page number',
    type: Number,
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Number of tasks per page',
    type: Number,
    required: false,
    example: 10,
  })
  @ApiQuery({
    name: 'search',
    description: 'Search term',
    type: String,
    required: false,
    example: 'Example task',
  })
  @ApiResponse({
    status: 200,
    description: 'List of tasks',
    type: [ReturnTasksDto],
    example: [
      {
        id: '9f727cc4-2135-4dda-aa2a-c61e0ebe3de2',
        title: 'Example task',
        description: 'This is an example task',
        status: 'in_progress',
        priority: 'low',
        dueDate: '2025-06-24T03:00:00.000Z',
        tags: ['tag1', 'tag2'],
        createAt: '2021-06-24T03:00:00.000Z',
        updateAt: '2021-06-24T03:00:00.000Z',
      },
    ],
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid format or length',
    example: {
      message: [
        'sortBy must be "status", "priority" or "dueDate"',
        'order must be "ASC" or "DESC"',
        'page must not be less than 1',
        'page must be a number string',
        'limit must not be less than 1',
        'limit must be a number conforming to the specified constraints',
      ],
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access',
    example: {
      message: 'Unauthorized access',
      error: 'Unauthorized',
      statusCode: 401,
    },
  })
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

  @ApiOperation({
    summary: 'Find a task by ID',
    description:
      'Endpoint for finding a task by ID. The Authorization Bearer of the request must contain the Access Token and the request parameter must contain the task ID',
    operationId: 'findOneTask',
    deprecated: false,
  })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Formatless Access Token: Bearer {token}',
    required: true,
  })
  @ApiParam({
    name: 'id',
    description: 'Task ID',
    type: String,
    required: true,
    example: '9f727cc4-2135-4dda-aa2a-c61e0ebe3de2',
  })
  @ApiResponse({
    status: 200,
    description: 'Task found',
    type: ReturnTasksDto,
    example: {
      id: '9f727cc4-2135-4dda-aa2a-c61e0ebe3de2',
      title: 'Example task',
      description: 'This is an example task',
      status: 'in_progress',
      priority: 'low',
      dueDate: '2025-06-24T03:00:00.000Z',
      tags: ['tag1', 'tag2'],
      createAt: '2021-06-24T03:00:00.000Z',
      updateAt: '2021-06-24T03:00:00.000Z',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid format or length',
    example: {
      message: 'Validation failed (uuid is expected)',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access',
    example: {
      message: 'Unauthorized access',
      error: 'Unauthorized',
      statusCode: 401,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
    example: {
      message: 'Task not found',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @Get(':id')
  async findOneTask(
    @Req() req,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ReturnTasksDto> {
    return this.tasksService.findOneTask(req.user.id, id);
  }

  @ApiOperation({
    summary: 'Update a task',
    description:
      'Endpoint for updating a task. The Authorization Bearer of the request must contain the Access Token and the request parameter must contain the task ID and the request body must contain optional fields such as title, description, status, priority, dueDate and tags',
    operationId: 'updateTask',
    deprecated: false,
  })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Formatless Access Token: Bearer {token}',
    required: true,
  })
  @ApiParam({
    name: 'id',
    description: 'Task ID',
    type: String,
    required: true,
    example: '9f727cc4-2135-4dda-aa2a-c61e0ebe3de2',
  })
  @ApiBody({
    type: UpdateTasksDto,
    description: 'Task information to be updated',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Task updated',
    type: ReturnTasksDto,
    example: {
      id: '9f727cc4-2135-4dda-aa2a-c61e0ebe3de2',
      title: 'Example task',
      description: 'This is an example task',
      status: 'in_progress',
      priority: 'low',
      dueDate: '2025-06-24T03:00:00.000Z',
      tags: ['tag1', 'tag2'],
      createAt: '2021-06-24T03:00:00.000Z',
      updateAt: '2021-06-24T03:00:00.000Z',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid format or length',
    example: {
      message: 'Validation failed (uuid is expected)',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access',
    example: {
      message: 'Unauthorized access',
      error: 'Unauthorized',
      statusCode: 401,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
    example: {
      message: 'Task not found',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @Patch(':id')
  async updateTask(
    @Req() req,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe()) updateTasksDto: UpdateTasksDto,
  ): Promise<ReturnTasksDto> {
    return this.tasksService.updateTask(req.user.id, id, updateTasksDto);
  }

  @ApiOperation({
    summary: 'Delete a task',
    description:
      'Endpoint for deleting a task. The Authorization Bearer of the request must contain the Access Token and the request parameter must contain the task ID',
    operationId: 'deleteTask',
    deprecated: false,
  })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Formatless Access Token: Bearer {token}',
    required: true,
  })
  @ApiParam({
    name: 'id',
    description: 'Task ID',
    type: String,
    required: true,
    example: '9f727cc4-2135-4dda-aa2a-c61e0ebe3de2',
  })
  @ApiResponse({
    status: 200,
    description: 'Task deleted',
    example: {
      message:
        'Task with id 9f727cc4-2135-4dda-aa2a-c61e0ebe3de2 was successfully deleted',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid format or length',
    example: {
      message: 'Validation failed (uuid is expected)',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access',
    example: {
      message: 'Unauthorized access',
      error: 'Unauthorized',
      statusCode: 401,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
    example: {
      message: 'Task not found',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @Delete(':id')
  async deleteTask(
    @Req() req,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Object> {
    return this.tasksService.deleteTask(req.user.id, id);
  }
}
