import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StockDataList } from 'src/Entity/StockList.entity';
import axios from 'axios';

@Injectable()
export class MarketService {
  constructor(
    @InjectRepository(StockDataList)
    private readonly stockRepository: Repository<StockDataList>,
  ) {}

  // Fetch from Alpha Vantage API
  async fetchFromAlphaVantage(): Promise<any> {
    const apiKey = 'your_alpha_vantage_api_key';  // Replace with your actual API key
    const url = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${apiKey}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new HttpException('Failed to fetch data from Alpha Vantage', HttpStatus.BAD_GATEWAY);
    }
  }

  // Fetch local data from the database
  async fetchLocalData(): Promise<StockDataList[]> {
    return this.stockRepository.find();
  }

  // Merge local data with Alpha Vantage data
  async getMergedStockData(): Promise<any> {
    const localData = await this.fetchLocalData();
    const alphaVantageData = await this.fetchFromAlphaVantage();

    const mergedData = localData.map((localEntry) => {
      const mostActivelyTraded = localEntry.most_actively_traded?.map((traded) => {
        const alphaEntry = alphaVantageData.most_actively_traded?.find((alpha) => alpha.ticker === traded.ticker) || {};
        return { ...traded, alphaData: alphaEntry };
      });

      const topGainers = localEntry.top_gainers?.map((gainer) => {
        const alphaEntry = alphaVantageData.top_gainers?.find((alpha) => alpha.ticker === gainer.ticker) || {};
        return { ...gainer, alphaData: alphaEntry };
      });

      const topLosers = localEntry.top_losers?.map((loser) => {
        const alphaEntry = alphaVantageData.top_losers?.find((alpha) => alpha.ticker === loser.ticker) || {};
        return { ...loser, alphaData: alphaEntry };
      });
      return {
        id: localEntry.id,
        lastUpdated: localEntry.lastUpdated || new Date().toISOString(),
        top_gainers: topGainers || alphaVantageData.top_gainers,
        top_losers: topLosers || alphaVantageData.top_losers,
        most_actively_traded: mostActivelyTraded || alphaVantageData.most_actively_traded,
      };
    });

    // If no local data, return only Alpha Vantage data
    if (!localData.length) {
      return alphaVantageData;
    }

    return mergedData;
  }
}
