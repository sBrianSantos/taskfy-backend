import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { ReturnTasksDto } from './dto/returnTasks.dto';
import { CreateTasksDto } from './dto/createTasks.dto';
import { UpdateTasksDto } from './dto/updateTasks.dto';

export const CreateTaskDoc = () =>
  applyDecorators(
    ...[
      ApiOperation({
        summary: 'Create a new task',
        description:
          'Endpoint for creating a new task. The Authorization Bearer of the request must contain the Access Token and the request body must contain mandatory fields such as title, status and priority, and optional fields such as description, dueDate and tags',
        operationId: 'createTask',
        deprecated: false,
      }),
      ApiBearerAuth(),
      ApiHeader({
        name: 'Authorization',
        description: 'Formatless Access Token: Bearer {token}',
        required: true,
      }),
      ApiBody({
        type: CreateTasksDto,
        description: 'Task information to be created',
        required: true,
      }),
      ApiResponse({
        status: 201,
        description: 'Task created successfully',
        type: ReturnTasksDto,
      }),
      ApiResponse({
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
      }),
      ApiResponse({
        status: 401,
        description: 'Unauthorized access',
        example: {
          message: 'Unauthorized access',
          error: 'Unauthorized',
          statusCode: 401,
        },
      }),
    ],
  );

export const FindAllTasksDoc = () =>
  applyDecorators(
    ...[
      ApiOperation({
        summary: 'List all tasks',
        description:
          'Endpoint for listing all tasks. The Authorization Bearer of the request must contain the Access Token and the request query can contain optional fields such as page and limit',
      }),
      ApiBearerAuth(),
      ApiHeader({
        name: 'Authorization',
        description: 'Formatless Access Token: Bearer {token}',
        required: true,
      }),
      ApiQuery({
        name: 'page',
        description: 'Page number',
        type: Number,
        required: false,
        example: 1,
      }),
      ApiQuery({
        name: 'limit',
        description: 'Number of tasks per page',
        type: Number,
        required: false,
        example: 10,
      }),
      ApiResponse({
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
      }),
      ApiResponse({
        status: 400,
        description: 'Invalid format or length',
        example: {
          message: [
            'page must not be less than 1',
            'page must be a number conforming to the specified constraints',
            'limit must not be less than 1',
            'limit must be a number conforming to the specified constraints',
          ],
          error: 'Bad Request',
          statusCode: 400,
        },
      }),
      ApiResponse({
        status: 401,
        description: 'Unauthorized access',
        example: {
          message: 'Unauthorized access',
          error: 'Unauthorized',
          statusCode: 401,
        },
      }),
    ],
  );

export const SearchTasksDoc = () =>
  applyDecorators(
    ...[
      ApiOperation({
        summary: 'Search tasks',
        description:
          'Endpoint for searching tasks. The Authorization Bearer of the request must contain the Access Token and the request query can contain optional field such title',
        operationId: 'searchTasks',
        deprecated: false,
      }),
      ApiBearerAuth(),
      ApiHeader({
        name: 'Authorization',
        description: 'Formatless Access Token: Bearer {token}',
        required: true,
      }),
      ApiQuery({
        name: 'title',
        description: 'Task title',
        type: String,
        required: false,
        example: 'Example task',
      }),
      ApiResponse({
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
      }),
      ApiResponse({
        status: 401,
        description: 'Unauthorized access',
        example: {
          message: 'Unauthorized access',
          error: 'Unauthorized',
          statusCode: 401,
        },
      }),
    ],
  );

export const GetSortedTasks = () =>
  applyDecorators(
    ...[
      ApiOperation({
        summary: 'List tasks sorted',
        description:
          'Endpoint for listing tasks sorted. The Authorization Bearer of the request must contain the Access Token and the request query can contain optional fields such as sortBy and order',
        operationId: 'getSortedTasks',
        deprecated: false,
      }),
      ApiBearerAuth(),
      ApiHeader({
        name: 'Authorization',
        description: 'Formatless Access Token: Bearer {token}',
        required: true,
      }),
      ApiQuery({
        name: 'sortBy',
        description: 'Sort by',
        type: String,
        required: false,
        example: 'low',
      }),
      ApiQuery({
        name: 'order',
        description: 'Order',
        type: String,
        required: false,
        example: 'asc',
      }),
      ApiResponse({
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
      }),
      ApiResponse({
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
      }),
      ApiResponse({
        status: 401,
        description: 'Unauthorized access',
        example: {
          message: 'Unauthorized access',
          error: 'Unauthorized',
          statusCode: 401,
        },
      }),
    ],
  );

export const GetFilteredTasks = () =>
  applyDecorators(
    ...[
      ApiOperation({
        summary: 'List tasks filtered',
        description:
          'Endpoint for listing tasks filtered. The Authorization Bearer of the request must contain the Access Token and the request query can contain optional fields such as sortBy, order, page, limit and search',
        operationId: 'getFilteredTasks',
        deprecated: false,
      }),
      ApiBearerAuth(),
      ApiHeader({
        name: 'Authorization',
        description: 'Formatless Access Token: Bearer {token}',
        required: true,
      }),
      ApiQuery({
        name: 'sortBy',
        description: 'Sort by',
        type: String,
        required: false,
        example: 'low',
      }),
      ApiQuery({
        name: 'order',
        description: 'Order',
        type: String,
        required: false,
        example: 'asc',
      }),
      ApiQuery({
        name: 'page',
        description: 'Page number',
        type: Number,
        required: false,
        example: 1,
      }),
      ApiQuery({
        name: 'limit',
        description: 'Number of tasks per page',
        type: Number,
        required: false,
        example: 10,
      }),
      ApiQuery({
        name: 'search',
        description: 'Search term',
        type: String,
        required: false,
        example: 'Example task',
      }),
      ApiResponse({
        status: 200,
        description: 'List of tasks',
        type: [ReturnTasksDto],
        example: [
          {
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
        ],
      }),
      ApiResponse({
        status: 400,
        description: 'Invalid format or length',
        example: {
          message: [
            'sortBy must be "status", "priority" or "dueDate"',
            'order must be "ASC" or "DESC"',
            'page must not be less than 1',
            'page must be a number conforming to the specified constraints',
            'limit must not be less than 1',
            'limit must be a number conforming to the specified constraints',
          ],
          error: 'Bad Request',
          statusCode: 400,
        },
      }),
      ApiResponse({
        status: 401,
        description: 'Unauthorized access',
        example: {
          message: 'Unauthorized access',
          error: 'Unauthorized',
          statusCode: 401,
        },
      }),
    ],
  );

export const FindOneTaskDoc = () =>
  applyDecorators(
    ...[
      ApiOperation({
        summary: 'Find a task by ID',
        description:
          'Endpoint for finding a task by ID. The Authorization Bearer of the request must contain the Access Token and the request parameter must contain the task ID',
        operationId: 'findOneTask',
        deprecated: false,
      }),
      ApiBearerAuth(),
      ApiHeader({
        name: 'Authorization',
        description: 'Formatless Access Token: Bearer {token}',
        required: true,
      }),
      ApiParam({
        name: 'id',
        description: 'Task ID',
        type: String,
        required: true,
        example: '9f727cc4-2135-4dda-aa2a-c61e0ebe3de2',
      }),
      ApiResponse({
        status: 200,
        description: 'Task found',
        type: ReturnTasksDto,
      }),
      ApiResponse({
        status: 400,
        description: 'Invalid format or length',
        example: {
          message: 'Validation failed (uuid is expected)',
          error: 'Bad Request',
          statusCode: 400,
        },
      }),
      ApiResponse({
        status: 401,
        description: 'Unauthorized access',
        example: {
          message: 'Unauthorized access',
          error: 'Unauthorized',
          statusCode: 401,
        },
      }),
      ApiResponse({
        status: 404,
        description: 'Task not found',
        example: {
          message: 'Task not found',
          error: 'Not Found',
          statusCode: 404,
        },
      }),
    ],
  );

export const UpdateTaskDoc = () =>
  applyDecorators(
    ...[
      ApiOperation({
        summary: 'Update a task',
        description:
          'Endpoint for updating a task. The Authorization Bearer of the request must contain the Access Token, the request parameter must contain the task ID and the request body must contain optional fields such as title, description, status, priority, dueDate and tags',
        operationId: 'updateTask',
        deprecated: false,
      }),
      ApiBearerAuth(),
      ApiHeader({
        name: 'Authorization',
        description: 'Formatless Access Token: Bearer {token}',
        required: true,
      }),
      ApiParam({
        name: 'id',
        description: 'Task ID',
        type: String,
        required: true,
        example: '9f727cc4-2135-4dda-aa2a-c61e0ebe3de2',
      }),
      ApiBody({
        type: UpdateTasksDto,
        description: 'Task information to be updated',
        required: false,
      }),
      ApiResponse({
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
      }),
      ApiResponse({
        status: 400,
        description: 'Invalid format or length',
        example: {
          message: [
            'Validation failed (uuid is expected)',
            'title must be shorter than or equal to 100 characters',
            'title must be longer than or equal to 3 characters',
            'title must be a string',
            'description must be shorter than or equal to 2000 characters',
            'description must be longer than or equal to 10 characters',
            'description must be a string',
            'status must be one of the following values: pending, in_progress, completed',
            'priority must be one of the following values: low, medium, high',
            'dueDate must be a valid ISO 8601 date string',
            'tags must be an array',
            'Unexpected token \',\', ..." "title": ,\r\n    "de"... is not valid JSON',
          ],
          error: 'Bad Request',
          statusCode: 400,
        },
      }),
      ApiResponse({
        status: 401,
        description: 'Unauthorized access',
        example: {
          message: 'Unauthorized access',
          error: 'Unauthorized',
          statusCode: 401,
        },
      }),
      ApiResponse({
        status: 404,
        description: 'Task not found',
        example: {
          message: 'Task not found',
          error: 'Not Found',
          statusCode: 404,
        },
      }),
    ],
  );

export const DeleteTaskDoc = () =>
  applyDecorators(
    ...[
      ApiOperation({
        summary: 'Delete a task',
        description:
          'Endpoint for deleting a task. The Authorization Bearer of the request must contain the Access Token and the request parameter must contain the task ID',
        operationId: 'deleteTask',
        deprecated: false,
      }),
      ApiBearerAuth(),
      ApiHeader({
        name: 'Authorization',
        description: 'Formatless Access Token: Bearer {token}',
        required: true,
      }),
      ApiParam({
        name: 'id',
        description: 'Task ID',
        type: String,
        required: true,
        example: '9f727cc4-2135-4dda-aa2a-c61e0ebe3de2',
      }),
      ApiResponse({
        status: 200,
        description: 'Task deleted',
        example: {
          message:
            'Task with id 9f727cc4-2135-4dda-aa2a-c61e0ebe3de2 was successfully deleted',
        },
      }),
      ApiResponse({
        status: 400,
        description: 'Invalid format or length',
        example: {
          message: 'Validation failed (uuid is expected)',
          error: 'Bad Request',
          statusCode: 400,
        },
      }),
      ApiResponse({
        status: 401,
        description: 'Unauthorized access',
        example: {
          message: 'Unauthorized access',
          error: 'Unauthorized',
          statusCode: 401,
        },
      }),
      ApiResponse({
        status: 404,
        description: 'Task not found',
        example: {
          message: 'Task not found',
          error: 'Not Found',
          statusCode: 404,
        },
      }),
    ],
  );
