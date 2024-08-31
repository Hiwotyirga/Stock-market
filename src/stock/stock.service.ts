import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class StockService {
  private readonly finnhubApiKey = 'cr9ffl1r01qkt06p5g2gcr9ffl1r01qkt06p5g30'; // Replace with your actual Finnhub API key

  async getRealTimeStockPrice(symbol: string): Promise<any> {
    try {
      const response = await axios.get(`https://finnhub.io/api/v1/quote`, {
        params: {
          symbol,
          token: this.finnhubApiKey,
        },
      });
      return response.data; // Finnhub returns price data directly
    } catch (error) {
      console.error('Error fetching stock price:', error.message);
      throw new Error('Error fetching stock price');
    }
  }
}
