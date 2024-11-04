// src/stocks/controllers/payment-method.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { PaymentMethod } from '../Entity/PaymentMethod.entity';
import { PaymentMethodDto } from '../dtos/Stock/PaymentMethod.dtos';

@Controller('payment-methods')
export class PaymentMethodController {
    constructor(private readonly paymentService: PaymentMethodService) {}

    @Post()
    async createPaymentMethod(@Body() paymentMethodDto: PaymentMethodDto): Promise<PaymentMethod> {
        return this.paymentService.createPaymentMethod(paymentMethodDto);
    }

    @Get()
    async findAll(): Promise<PaymentMethod[]> {
        return this.paymentService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<PaymentMethod> {
        return this.paymentService.findOne(id);
    }

    @Put(':id')
    async updatePaymentMethod(
        @Param('id') id: string,
        @Body() paymentMethodDto: PaymentMethodDto
    ): Promise<PaymentMethod> {
        return this.paymentService.updatePaymentMethod(id, paymentMethodDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.paymentService.remove(id);
    }
}
