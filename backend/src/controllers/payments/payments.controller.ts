import { Body, Controller, Post, Ip, Param, Get } from '@nestjs/common';
import { Payment } from '@prisma/client';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentsService) {}

  @Post('start-payment')
  async startPayment(@Body() data: Payment, @Ip() ip) {
    return this.paymentService.startPayment(data, ip);
  }

  @Get('verify-payment')
  async verifyPayment() {
    return this.paymentService.verifyPayment();
  }

  @Post('listening-payment')
  async listeningPayment(@Body() data) {
    return this.paymentService.listeningPayment(data);
  }
}
