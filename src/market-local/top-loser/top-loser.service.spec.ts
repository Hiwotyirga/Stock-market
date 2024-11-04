import { Test, TestingModule } from '@nestjs/testing';
import { TopLoserService } from './top-loser.service';

describe('TopLoserService', () => {
  let service: TopLoserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopLoserService],
    }).compile();

    service = module.get<TopLoserService>(TopLoserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
