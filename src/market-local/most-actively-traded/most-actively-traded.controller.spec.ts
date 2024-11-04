import { Test, TestingModule } from '@nestjs/testing';
import { MostActivelyTradedController } from './most-actively-traded.controller';

describe('MostActivelyTradedController', () => {
  let controller: MostActivelyTradedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MostActivelyTradedController],
    }).compile();

    controller = module.get<MostActivelyTradedController>(MostActivelyTradedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
