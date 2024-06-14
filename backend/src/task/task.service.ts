import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { ITask, Task, TaskPayload } from './task.model';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private readonly model: Model<ITask>) {}

  async findAll(userId: string): Promise<Task[]> {
    return await this.model.find({ user: new Types.ObjectId(userId) }).exec();
  }

  async findOne(id: string, userId: string): Promise<Task> {
    return await this.model.findOne({ _id: id, user: new Types.ObjectId(userId) }).exec();
  }

  async create(payload: TaskPayload, userId: string): Promise<Task> {
    return await new this.model({
      ...payload,
      createdAt: new Date(),
      user: userId,
    }).save();
  }

  async update(id: string, payload: TaskPayload, userId: string): Promise<Task> {
    return await this.model.findOneAndUpdate({ _id: id, user: new Types.ObjectId(userId) }, payload).exec();
  }

  async delete(id: string, userId: string): Promise<Task> {
    return await this.model.findOneAndDelete({ _id: id, user: new Types.ObjectId(userId) }).exec();
  }
}
