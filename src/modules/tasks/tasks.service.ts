import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksEntity } from './entity/tasks.entity';
import { CreateTasksDto } from './dto/createTasks.dto';
import { UpdateTasksDto } from './dto/updateTasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly tasksRepository: Repository<TasksEntity>,
  ) {}

  async createTask(
    userId: string,
    createTasksDto: CreateTasksDto,
  ): Promise<TasksEntity> {
    const task = this.tasksRepository.create({
      ...createTasksDto,
      user: { id: userId },
    });

    return this.tasksRepository.save(task);
  }

  async findAllTasks(userId: string): Promise<TasksEntity[]> {
    return await this.tasksRepository.find({
      where: { user: { id: userId } },
    });
  }

  async findOneTask(userId: string, taskId: string): Promise<TasksEntity> {
    const task = await this.tasksRepository.findOne({
      where: { id: taskId, user: { id: userId } },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async updateTask(
    userId: string,
    taskId: string,
    updateTasksDto: UpdateTasksDto,
  ): Promise<TasksEntity> {
    const task = await this.tasksRepository.findOne({
      where: { id: taskId, user: { id: userId } },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    Object.assign(task, updateTasksDto);

    return await this.tasksRepository.save(task);
  }

  async deleteTask(userId: string, taskId: string) {
    const task = await this.tasksRepository.findOne({
      where: { id: taskId, user: { id: userId } },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await await this.tasksRepository.delete({
      id: taskId,
      user: { id: userId },
    });

    return { message: `Task with id ${taskId} was successfully deleted` };
  }
}
