import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Project } from 'src/project/project.model';
import { Task } from 'src/task/task.model';

// Schema & Document
@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  modifiedAt?: Date;

  @Prop({ type: Types.ObjectId, ref: 'Project' })
  projects: Project[];

  @Prop({ type: Types.ObjectId, ref: 'Task' })
  tasks: Task[];
}
export type IUser = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

// Payload
export class UpdateUserPayload {
  email: string;
  password?: string;
  name?: string;
}
