// src/stocks/services/payment-method.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethodDto } from '../dtos/Stock/PaymentMethod.dtos';
import { PaymentMethod } from '../Entity/PaymentMethod.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentMethodService {
    constructor(
        @InjectRepository(PaymentMethod)
        private readonly paymentMethodRepository: Repository<PaymentMethod>
    ) {}

    async createPaymentMethod(paymentMethodDto: PaymentMethodDto): Promise<PaymentMethod> {
        const paymentMethod = this.paymentMethodRepository.create(paymentMethodDto);
        return this.paymentMethodRepository.save(paymentMethod);
    }

    async findAll(): Promise<PaymentMethod[]> {
        return this.paymentMethodRepository.find();
    }

    async findOne(id: string): Promise<PaymentMethod> {
        return this.paymentMethodRepository.findOne({ where: { id } });
    }

    async updatePaymentMethod(id: string, paymentMethodDto: PaymentMethodDto): Promise<PaymentMethod> {
        await this.paymentMethodRepository.update(id, { Method: paymentMethodDto.Method });
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.paymentMethodRepository.delete(id);
    }
}
