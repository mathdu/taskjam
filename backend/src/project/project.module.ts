import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectSchema } from './project.model';

@Module({
  providers: [ProjectService],
  controllers: [ProjectController],
  imports: [
    MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }]),
  ],
})
export class ProjectModule {}
