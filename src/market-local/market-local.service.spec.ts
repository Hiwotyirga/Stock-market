import { Test, TestingModule } from '@nestjs/testing';
import { MarketLocalService } from './market-local.service';

describe('MarketLocalService', () => {
  let service: MarketLocalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarketLocalService],
    }).compile();

    service = module.get<MarketLocalService>(MarketLocalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
