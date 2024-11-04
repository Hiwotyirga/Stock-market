import { Test, TestingModule } from '@nestjs/testing';
import { TopGainerController } from './top-gainer.controller';

describe('TopGainerController', () => {
  let controller: TopGainerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopGainerController],
    }).compile();

    controller = module.get<TopGainerController>(TopGainerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
