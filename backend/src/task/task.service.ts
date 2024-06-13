import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ITask, Task, TaskDto } from './task.model';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private readonly model: Model<ITask>) {}

  async findAll(): Promise<Task[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<Task> {
    return await this.model.findById(id).exec();
  }

  async create(project: TaskDto): Promise<Task> {
    return await new this.model({
      ...project,
      createdAt: new Date(),
    }).save();
  }

  async update(id: string, project: TaskDto): Promise<Task> {
    return await this.model.findByIdAndUpdate(id, project).exec();
  }

  async delete(id: string): Promise<Task> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
