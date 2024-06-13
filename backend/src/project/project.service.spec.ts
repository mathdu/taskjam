import { Test, TestingModule } from '@nestjs/testing';

import { ProjectService } from './project.service';

// TODO
// const mockProject = {
//   title: 'test',
//   description: 'test',
//   createdAt: new Date(),
//   modifiedAt: new Date(),
// };

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectService],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // TODO
  // it('should create a project', () => {
  //   expect(service.create).toHaveBeenCalledWith(mockProject);
  // });
});
