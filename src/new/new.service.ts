import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios'; // Make sure this line is present
import { lastValueFrom } from 'rxjs';

@Injectable()
export class NewService {
  private readonly apiKey = '9SY6V223X198ZG7Y'; // Replace with your API key
  private readonly baseUrl = 'https://www.alphavantage.co/query';

  constructor(private readonly httpService: HttpService) {}

  async getNewData(ticker: string): Promise<any> {
    const url = `${this.baseUrl}?function=NEWS_SENTIMENT&tickers=${ticker}&apikey=${this.apiKey}`;
    try {
      const response: AxiosResponse = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      console.error('Error fetching stock news:', error);
      throw new Error('Failed to fetch stock news');
    }
  }
}
