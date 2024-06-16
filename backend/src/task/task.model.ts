import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Project } from 'src/project/project.model';
import { User } from 'src/user/user.model';

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

  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  project: Project;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;
}
export type ITask = Task & Document;
export const TaskSchema = SchemaFactory.createForClass(Task);

// set virtual field for `id`
TaskSchema.virtual('id').get(function() {
  return this._id.toHexString();
});
TaskSchema.set('toJSON', { virtuals: true,
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
 });
TaskSchema.set('toObject', { virtuals: true });

// Payload
export class TaskPayload {
  title: string;
  project: string;
}
export class UpdateTaskPayload {
  title?: string;
  project?: string;
  completedAt?: Date;
}
