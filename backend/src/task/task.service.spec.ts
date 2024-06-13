import { Test, TestingModule } from '@nestjs/testing';

import { TaskService } from './task.service';

// TODO
// const mockTask = {
//   title: 'test',
//   description: 'test',
//   createdAt: new Date(),
//   modifiedAt: new Date(),
// };

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // TODO
  // it('should create a task', () => {
  //   expect(service.create).toHaveBeenCalledWith(mockTask);
  // });
});
