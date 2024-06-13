import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskSchema } from './task.model';

@Module({
  providers: [TaskService],
  controllers: [TaskController],
  imports: [MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }])],
})
export class TaskModule {}
