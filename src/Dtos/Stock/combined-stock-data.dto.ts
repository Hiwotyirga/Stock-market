export interface CombinedStockData {
    id: string;
    metadata: string;
    lastUpdated: Date;
    topGainers: {
      ticker: string;
      price: string;
      changeAmount: string;
      changePercentage: string;
      volume: string;
    }[];
    topLosers: {
      ticker: string;
      price: string;
      changeAmount: string;
      changePercentage: string;
      volume: string;
    }[];
    mostActivelyTraded: {
      ticker: string;
      price: string;
      changeAmount: string;
      changePercentage: string;
      volume: string;
    }[];
    externalData?: any; // Adjust based on your needs
  }
  