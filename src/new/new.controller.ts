import { Controller, Get } from '@nestjs/common';
import { NewService } from './new.service';

@Controller('news')
export class NewController {
  constructor(private readonly newService: NewService) {}

  @Get()
  async getNewsData() {
    const newsData = await this.newService.getNewsData();
    return newsData;
  }
}
