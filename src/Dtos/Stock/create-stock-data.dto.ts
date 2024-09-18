import { IsString, IsOptional, IsArray, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

export class StockDataDto {


  @IsOptional()
  @Type(() => Date)
  lastUpdated?: Date;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  topGainers?: {
    ticker: string;
    price: string;
    changeAmount: string;
    changePercentage: string;
    volume: string;
  }[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  topLosers?: {
    ticker: string;
    price: string;
    changeAmount: string;
    changePercentage: string;
    volume: string;
  }[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  mostActivelyTraded?: {
    ticker: string;
    price: string;
    changeAmount: string;
    changePercentage: string;
    volume: string;
  }[];
}
