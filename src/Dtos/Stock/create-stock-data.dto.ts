import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class StockInfoDto {
  @IsString()
  ticker: string;

  @IsString()
  price: string;

  @IsString()
  change_amount: string;

  @IsString()
  change_percentage: string;

  @IsString()
  volume: string;
}

export class StockDataDto {
  @IsOptional()
  @Type(() => Date)
  lastUpdated?: Date;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StockInfoDto)
  top_gainers?: StockInfoDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StockInfoDto)
  top_losers?: StockInfoDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StockInfoDto)
  most_actively_traded?: StockInfoDto[];
}
