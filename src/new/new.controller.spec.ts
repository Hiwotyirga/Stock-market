import { Test, TestingModule } from '@nestjs/testing';
import { NewController } from './new.controller';

describe('NewController', () => {
  let controller: NewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewController],
    }).compile();

    controller = module.get<NewController>(NewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
