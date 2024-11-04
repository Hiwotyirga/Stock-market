import { Test, TestingModule } from '@nestjs/testing';
import { MostActivelyTradedService } from './most-actively-traded.service';

describe('MostActivelyTradedService', () => {
  let service: MostActivelyTradedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MostActivelyTradedService],
    }).compile();

    service = module.get<MostActivelyTradedService>(MostActivelyTradedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
