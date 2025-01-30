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

  async createTask(createTaskDto: CreateTasksDto): Promise<TasksEntity> {
    return await this.tasksRepository.save(createTaskDto);
  }

  async findAllTasks(): Promise<TasksEntity[]> {
    return await this.tasksRepository.find();
  }

  async findOneTask(id: string): Promise<TasksEntity> {
    const tasks = await this.tasksRepository.findOneBy({ id: id });

    if (!tasks) {
      throw new NotFoundException('Task not found');
    }

    return tasks;
  }

  async updateTask(
    id: string,
    updateTasksDto: UpdateTasksDto,
  ): Promise<TasksEntity> {
    const tasks = await this.tasksRepository.findOneBy({ id: id });

    if (!tasks) {
      throw new NotFoundException('Task not found');
    }

    await this.tasksRepository.update({ id: id }, updateTasksDto);

    return await this.tasksRepository.findOneBy({ id: id });
  }

  async deleteTask(id: string) {
    const tasks = await this.tasksRepository.findOneBy({ id: id });

    if (!tasks) {
      throw new NotFoundException('Task not found');
    }

    await this.tasksRepository.delete({ id: id });

    return { message: `Task with id ${id} was successfully deleted` };
  }
}
