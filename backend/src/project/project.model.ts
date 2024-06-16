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

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }] })
  tasks: Task[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;
}
export type IProject = Project & Document;
export const ProjectSchema = SchemaFactory.createForClass(Project);

// set virtual field for `id`
ProjectSchema.virtual('id').get(function() {
  return this._id.toHexString();
});
ProjectSchema.set('toJSON', { virtuals: true,
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
 });
ProjectSchema.set('toObject', { virtuals: true });

// Payload
export class ProjectPayload {
  title: string;
  description?: string;
}
