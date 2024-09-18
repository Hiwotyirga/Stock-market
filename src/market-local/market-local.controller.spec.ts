import { Test, TestingModule } from '@nestjs/testing';
import { MarketLocalController } from './market-local.controller';

describe('MarketLocalController', () => {
  let controller: MarketLocalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarketLocalController],
    }).compile();

    controller = module.get<MarketLocalController>(MarketLocalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
