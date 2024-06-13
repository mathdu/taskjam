import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Project } from 'src/project/project.model';

// Schema & Document
@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  completedAt?: Date;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  modifiedAt?: Date;

  @Prop({ type: Types.ObjectId, ref: 'Project' })
  project: Project;
}
export type ITask = Task & Document;
export const TaskSchema = SchemaFactory.createForClass(Task);

// DTO
export class TaskDto {
  title: string;
}
export class UpdateTaskDto extends TaskDto {
  completedAt: Date;
}
