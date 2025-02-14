import { Injectable, NotFoundException } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksEntity } from './entity/tasks.entity';
import { CreateTasksDto } from './dto/createTasks.dto';
import { UpdateTasksDto } from './dto/updateTasks.dto';
import { Order, SortBy } from './enum/tasks.enum';
import { ReturnTasksDto } from './dto/returnTasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksEntity)
    private readonly tasksRepository: Repository<TasksEntity>,
  ) {}

  async createTask(
    userId: string,
    createTasksDto: CreateTasksDto,
  ): Promise<ReturnTasksDto> {
    const task = this.tasksRepository.create({
      ...createTasksDto,
      user: { id: userId },
    });

    await this.tasksRepository.save(task);

    return new ReturnTasksDto(task);
  }

  async findAllTasks(
    userId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ tasks: ReturnTasksDto[]; total: number }> {
    const [tasks, total] = await this.tasksRepository.findAndCount({
      where: { user: { id: userId } },
      skip: (page - 1) * limit,
      take: limit,
    });

    const returnTasks = tasks.map((task) => new ReturnTasksDto(task));
    return { tasks: returnTasks, total };
  }

  async searchTasks(userId: string, title?: string): Promise<ReturnTasksDto[]> {
    if (title) {
      const tasks = await this.tasksRepository.find({
        where: { user: { id: userId }, title: ILike(`%${title}%`) },
      });

      return tasks.map((task) => new ReturnTasksDto(task));
    }

    const tasks = await this.tasksRepository.find({
      where: { user: { id: userId } },
    });

    return tasks.map((task) => new ReturnTasksDto(task));
  }

  async getSortedTasks(
    userId: string,
    sortBy: SortBy = SortBy.PRIORITY,
    order: Order = Order.ASC,
  ): Promise<ReturnTasksDto[]> {
    const priorityOrder = {
      low: 1,
      medium: 2,
      high: 3,
    };

    const statusOrder = {
      pending: 1,
      in_progress: 2,
      completed: 3,
    };

    const tasks = await this.tasksRepository
      .createQueryBuilder('task')
      .where('task.user_id = :userId', { userId })
      .addSelect(
        `CASE task.priority 
        WHEN 'low' THEN :low 
        WHEN 'medium' THEN :medium 
        WHEN 'high' THEN :high 
        ELSE 0 
       END`,
        'priority_order',
      )
      .addSelect(
        `CASE task.status 
        WHEN 'pending' THEN :pending 
        WHEN 'in_progress' THEN :in_progress 
        WHEN 'completed' THEN :completed 
        ELSE 0 
       END`,
        'status_order',
      )
      .setParameters({
        low: priorityOrder.low,
        medium: priorityOrder.medium,
        high: priorityOrder.high,
        pending: statusOrder.pending,
        in_progress: statusOrder.in_progress,
        completed: statusOrder.completed,
      })
      .orderBy(
        sortBy === SortBy.PRIORITY
          ? 'priority_order'
          : sortBy === SortBy.STATUS
            ? 'status_order'
            : `task.${sortBy}`,
        order,
      )
      .getMany();

    return tasks.map((task) => new ReturnTasksDto(task));
  }

  async getFilteredTasks(
    userId: string,
    sortBy: SortBy = SortBy.PRIORITY,
    order: Order = Order.ASC,
    page: number = 1,
    limit: number = 10,
    title?: string,
  ): Promise<{ tasks: TasksEntity[]; total: number }> {
    const priorityOrder = {
      low: 1,
      medium: 2,
      high: 3,
    };

    const statusOrder = {
      pending: 1,
      in_progress: 2,
      completed: 3,
    };

    const whereUser: any = { user: { id: userId } };

    if (title) {
      whereUser.title = ILike(`%${title}%`);
    }

    const [tasks, total] = await this.tasksRepository
      .createQueryBuilder('task')
      .where(whereUser)
      .addSelect(
        `CASE task.priority 
        WHEN 'low' THEN :low 
        WHEN 'medium' THEN :medium 
        WHEN 'high' THEN :high 
        ELSE 0 
       END`,
        'priority_order',
      )
      .addSelect(
        `CASE task.status 
        WHEN 'pending' THEN :pending 
        WHEN 'in_progress' THEN :in_progress 
        WHEN 'completed' THEN :completed 
        ELSE 0 
       END`,
        'status_order',
      )
      .setParameters({
        low: priorityOrder.low,
        medium: priorityOrder.medium,
        high: priorityOrder.high,
        pending: statusOrder.pending,
        in_progress: statusOrder.in_progress,
        completed: statusOrder.completed,
      })
      .orderBy(
        sortBy === SortBy.PRIORITY
          ? 'priority_order'
          : sortBy === SortBy.STATUS
            ? 'status_order'
            : `task.${sortBy}`,
        order,
      )
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { tasks, total };
  }

  async findOneTask(userId: string, taskId: string): Promise<ReturnTasksDto> {
    const task = await this.tasksRepository.findOne({
      where: { id: taskId, user: { id: userId } },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return new ReturnTasksDto(task);
  }

  async updateTask(
    userId: string,
    taskId: string,
    updateTasksDto: UpdateTasksDto,
  ): Promise<ReturnTasksDto> {
    const task = await this.tasksRepository.findOne({
      where: { id: taskId, user: { id: userId } },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    Object.assign(task, updateTasksDto);
    await this.tasksRepository.save(task);

    return new ReturnTasksDto(task);
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
