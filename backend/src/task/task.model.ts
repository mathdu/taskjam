import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
