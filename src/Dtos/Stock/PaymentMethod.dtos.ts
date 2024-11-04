import { IsString, IsNotEmpty } from 'class-validator';

export class PaymentMethodDto {
    @IsString()
    @IsNotEmpty()
    Method: string;

}
