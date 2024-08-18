import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class NewService {
  private readonly apiKey = 'deef9d2387004093a321b9580e9350aa'; // Replace with your News API key
  private readonly baseUrl = 'https://newsapi.org/v2/everything';

  constructor(private readonly httpService: HttpService) {}

  async getNewsData(): Promise<any> {
    const url = `${this.baseUrl}?q=stock market&apiKey=${this.apiKey}`;
    try {
      const response: AxiosResponse = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      console.error('Error fetching news data:', error);
      throw new Error('Failed to fetch news data');
    }
  }
}
