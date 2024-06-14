import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { TaskPayload, UpdateTaskPayload } from './task.model';
import { TaskService } from './task.service';

@ApiBearerAuth()
@ApiTags('tasks')
@Controller('api/tasks')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Get()
  @UseGuards(AuthGuard("jwt"))
  async index(@Req() req) {
    return await this.service.findAll(req.user._id);
  }

  @Get(':id')
  @UseGuards(AuthGuard("jwt"))
  async find(@Param('id') id: string, @Req() req) {
    return await this.service.findOne(id, req.user._id);
  }

  @Post()
  @UseGuards(AuthGuard("jwt"))
  async create(@Body() task: TaskPayload, @Req() req) {
    return await this.service.create(task, req.user._id);
  }

  @Put(':id')
  @UseGuards(AuthGuard("jwt"))
  async update(@Param('id') id: string, @Body() payload: UpdateTaskPayload, @Req() req) {
    return await this.service.update(id, payload, req.user._id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard("jwt"))
  async delete(@Param('id') id: string, @Req() req) {
    return await this.service.delete(id, req.user._id);
  }
}
