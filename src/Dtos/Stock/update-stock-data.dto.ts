import {
  IsOptional,
  IsString,
  IsArray,
  IsObject,
  ValidateNested,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

class StockDetailDto {
  @IsOptional()
  @IsString()
  ticker?: string;

  @IsOptional()
  @IsString()
  price?: string;

  @IsOptional()
  @IsString()
  changeAmount?: string;

  @IsOptional()
  @IsString()
  changePercentage?: string;

  @IsOptional()
  @IsString()
  volume?: string;
}

export class UpdateStockDataDto {
  @IsOptional()
  @IsString()
  metadata?: string;

  @IsOptional()
  @IsDate()
  lastUpdated?: Date;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StockDetailDto)
  topGainers?: StockDetailDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StockDetailDto)
  topLosers?: StockDetailDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StockDetailDto)
  mostActivelyTraded?: StockDetailDto[];
}
