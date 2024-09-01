import { Controller, Post, Body, Ip } from '@nestjs/common';
import { StartPaymentUseCase } from '../../application/use-cases/start-payment.use-case';
import { Payment } from '../../domain/entities/payment.entity';

@Controller('payments')
export class PaymentController {
  constructor(private readonly startPaymentUseCase: StartPaymentUseCase) {}

  @Post('start')
  async startPayment(@Body() data: Payment, @Ip() ip: string) {
    return this.startPaymentUseCase.execute(data, ip);
  }
}
