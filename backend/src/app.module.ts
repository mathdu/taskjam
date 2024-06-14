import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ProjectModule,
    TaskModule,
    UserModule,
    MongooseModule.forRoot('mongodb://mongo/nest'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
