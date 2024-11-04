import { Test, TestingModule } from '@nestjs/testing';
import { LocalStockService } from './market-local.service';

describe('MarketLocalService', () => {
  let service: LocalStockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalStockService],
    }).compile();

    service = module.get<LocalStockService>(LocalStockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
