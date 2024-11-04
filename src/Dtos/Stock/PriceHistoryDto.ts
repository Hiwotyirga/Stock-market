import { IsNumber } from 'class-validator';

export class PriceHistoryDto {
  @IsNumber()
  price: number;
}
