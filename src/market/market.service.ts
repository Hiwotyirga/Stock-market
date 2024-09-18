// import { Injectable } from '@nestjs/common';
// import { HttpService } from '@nestjs/axios';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { StockDataList } from 'src/Entity/StockList.entity';
// import { lastValueFrom } from 'rxjs';
// import { CombinedStockData } from 'src/Dtos/Stock/combined-stock-data.dto';

// @Injectable()
// export class MarketService {
  // private readonly localrUrl = http://localhost:8080/stock-market/stock/list';

//   private readonly losserUrl = 'https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=1MN821Z1W1HHCK9A';

//   constructor(
//     @InjectRepository(StockDataList)
//     private readonly stockRepository: Repository<StockDataList>,
//     private readonly httpService: HttpService,
//   ) {}

//   async getCombinedMarketData(): Promise<CombinedStockData[]> {
//     const externalData = await this.fetchExternalData();
//     const localData = await this.stockRepository.find();

//     if (localData.length === 0) {
//       // If no local data, return only external data
//       return this.formatExternalData(externalData);
//     }

//     // Merge local data with external data
//     return this.mergeData(localData, externalData);
//   }

//   private async fetchExternalData() {
//     try {
//       const response = await lastValueFrom(this.httpService.get(this.losserUrl));
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching external data:', error);
//       return []; // Return an empty array if there's an error
//     }
//   }

//   private mergeData(localData: StockDataList[], externalData: any): CombinedStockData[] {
//     return localData.map(data => ({
//       ...data,
//       externalData: externalData
//     }));
//   }

//   private formatExternalData(externalData: any): CombinedStockData[] {
//     // Format the external data according to your DTO structure
//     // This is a placeholder; adjust according to the actual structure of the external data
//     return [{
//       id: '', // Placeholder value
//       metadata: 'External Data',
//       lastUpdated: new Date(),
//       topGainers: externalData.topGainers || [],
//       topLosers: externalData.topLosers || [],
//       mostActivelyTraded: externalData.mostActivelyTraded || [],
//       externalData: externalData // or format as needed
//     }];
//   }
// }

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MarketService {
  private readonly apiKey = '1MN821Z1W1HHCK9A'; // Alpha Vantage API Key
  private readonly apiUrl = 'https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS';

  async getStockList(): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}&apikey=${this.apiKey}`);
      return response.data; // Process the response as per your requirement
    } catch (error) {
      throw new HttpException(
        'Error fetching stock data from Alpha Vantage API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
