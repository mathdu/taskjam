import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IProject, Project } from './project.model';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private readonly model: Model<IProject>,
  ) {}
}
