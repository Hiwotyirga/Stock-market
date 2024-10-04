export class CreateTradeDto {
  userId: string;
  stockId: string;
  price: number;
  quantity: number;
  type: 'BUY' | 'SELL';
}
