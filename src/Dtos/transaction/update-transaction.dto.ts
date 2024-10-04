import { IsOptional, IsNumber, IsString, IsEmail } from 'class-validator';

export class UpdateTransactionDto {
  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  transactionType?: string;
}
