import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [ProjectModule, MongooseModule.forRoot('mongodb://mongo/nest')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
