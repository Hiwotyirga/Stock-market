import { Injectable} from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class StockMarketService {
  private readonly apiKey = '5AG9CMOFM0DU3T38';
  private readonly apiUrl = 'https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS';

  constructor(private readonly httpService: HttpService) {}

  async getStockData(): Promise<any> {
    try {
      const response: AxiosResponse = await this.httpService
        .get(`${this.apiUrl}&apikey=${this.apiKey}`)
        .toPromise();
      return response.data;
    } catch (error) {
      throw new Error('Error fetching stock market data');
    }
  }
}
