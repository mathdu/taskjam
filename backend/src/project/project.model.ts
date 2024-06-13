import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Task } from 'src/task/task.model';
import { User } from 'src/user/user.model';

@Schema()
export class Project {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  modifiedAt?: Date;

  @Prop({ type: Types.ObjectId, ref: 'Task' })
  tasks: Task[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;
}
export type IProject = Project & Document;
export const ProjectSchema = SchemaFactory.createForClass(Project);

// Payload
export class ProjectPayload {
  title: string;
  description?: string;
}
