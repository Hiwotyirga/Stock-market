import { IsArray, IsOptional, ValidateNested, IsString, IsDate, IsNumber } from 'class-validator';

export class TopGainerDto {
  @IsString()
  ticker: string;

  @IsNumber()
  price: number;  // Change to number

  @IsNumber()
  change_amount: number;  // Change to number

  @IsNumber()
  change_percentage: number;  // Change to number

  @IsNumber()
  volume: number;
}


export class TopLoserDto {
  @IsString()
  ticker: string;

  @IsNumber()
  price: number;  // Change to number

  @IsNumber()
  change_amount: number;  // Change to number

  @IsNumber()
  change_percentage: number;  // Change to number

  @IsNumber()
  volume: number;
}


export class MostActiveTradeDto {
  @IsString()
  ticker: string;

  @IsNumber()
  price: number;  // Change to number

  @IsNumber()
  change_amount: number;  // Change to number

  @IsNumber()
  change_percentage: number;  // Change to number

  @IsNumber()
  volume: number;
}
