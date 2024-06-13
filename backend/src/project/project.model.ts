import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
}
export type IProject = Project & Document;
export const ProjectSchema = SchemaFactory.createForClass(Project);

export class ProjectDto {
  title: string;
  description?: string;
}
