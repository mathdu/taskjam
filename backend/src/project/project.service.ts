import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IProject, Project, ProjectDto } from './project.model';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private readonly model: Model<IProject>,
  ) {}

  async findAll(): Promise<Project[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<Project> {
    return await this.model.findById(id).exec();
  }

  async create(project: ProjectDto): Promise<Project> {
    return await new this.model({
      ...project,
      createdAt: new Date(),
    }).save();
  }

  async update(id: string, project: ProjectDto): Promise<Project> {
    return await this.model.findByIdAndUpdate(id, project).exec();
  }

  async delete(id: string): Promise<Project> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
