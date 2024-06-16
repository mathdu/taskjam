import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { ITask, Task, TaskPayload, UpdateTaskPayload } from './task.model';
import { ProjectService } from 'src/project/project.service';

const selectedFields = ['id', 'title', 'project', 'completedAt'];

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly model: Model<ITask>,
    private readonly projectService: ProjectService
  ) {}

  private async checkProjectExists(projectId: string, userId: string) {
    const project = await this.projectService.findOne(projectId, userId);
    if (!project)
      throw new BadRequestException('The project ID specified could not be found.');
  }

  async findAll(userId: string): Promise<Task[]> {
    return await this.model.find({ user: new Types.ObjectId(userId) }).select(selectedFields).exec();
  }

  // TODO: fix projectId format (ObjectId)
  async findAllForProject(projectId: string, userId: string): Promise<Task[]> {
    return await this.model.find({ project: projectId, user: new Types.ObjectId(userId) }).populate('project', 'title').select(selectedFields).exec();
  }

  async findOne(id: string, userId: string): Promise<Task> {
    return await this.model.findOne({ _id: id, user: new Types.ObjectId(userId) }).select(selectedFields).exec();
  }

  async create(payload: TaskPayload, userId: string): Promise<Task> {
    await this.checkProjectExists(payload.project, userId);
    return await new this.model({
      ...payload,
      createdAt: new Date(),
      user: userId,
    }).save();
  }

  async update(id: string, payload: UpdateTaskPayload, userId: string): Promise<Task> {
    await this.checkProjectExists(payload.project, userId);
    return await this.model.findOneAndUpdate({ _id: id, user: new Types.ObjectId(userId) }, payload).select(selectedFields).exec();
  }

  async delete(id: string, userId: string): Promise<Task> {
    return await this.model.findOneAndDelete({ _id: id, user: new Types.ObjectId(userId) }).select(selectedFields).exec();
  }
}
