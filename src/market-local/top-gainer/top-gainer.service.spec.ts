import { Test, TestingModule } from '@nestjs/testing';
import { TopGainerService } from './top-gainer.service';

describe('TopGainerService', () => {
  let service: TopGainerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopGainerService],
    }).compile();

    service = module.get<TopGainerService>(TopGainerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
