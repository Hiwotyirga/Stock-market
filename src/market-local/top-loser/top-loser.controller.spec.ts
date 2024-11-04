import { Test, TestingModule } from '@nestjs/testing';
import { TopLoserController } from './top-loser.controller';

describe('TopLoserController', () => {
  let controller: TopLoserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopLoserController],
    }).compile();

    controller = module.get<TopLoserController>(TopLoserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
