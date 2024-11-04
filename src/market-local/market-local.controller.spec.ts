import { Test, TestingModule } from '@nestjs/testing';
import { LocalStockController } from './market-local.controller';

describe('MarketLocalController', () => {
  let controller: LocalStockController ;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocalStockController ],
    }).compile();

    controller = module.get<LocalStockController >(LocalStockController );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
