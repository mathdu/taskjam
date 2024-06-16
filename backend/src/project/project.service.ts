import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { IProject, Project, ProjectPayload } from './project.model';

const selectedFields = ['id', 'title', 'description'];

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private readonly model: Model<IProject>,
  ) {}

  async findAll(userId: string): Promise<Project[]> {
    return await this.model.find({ user: new Types.ObjectId(userId) }).select(selectedFields).exec();
  }

  async findOne(id: string, userId: string): Promise<Project> {
    return await this.model.findOne({ _id: id, user: new Types.ObjectId(userId) }).populate('tasks').select(selectedFields).exec();
  }

  async create(payload: ProjectPayload, userId: string): Promise<Project> {
    const project = await new this.model({
      ...payload,
      createdAt: new Date(),
      user: userId,
    }).save();

    return project;
  }

  async update(id: string, payload: ProjectPayload, userId: string): Promise<Project> {
    return await this.model.findOneAndUpdate({ _id: id, user: new Types.ObjectId(userId) }, payload).select(selectedFields).exec();
  }

  async delete(id: string, userId: string): Promise<Project> {
    return await this.model.findOneAndDelete({_id: id, user: new Types.ObjectId(userId)}).select(selectedFields).exec();
  }
}
