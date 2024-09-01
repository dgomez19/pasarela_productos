import { Module } from '@nestjs/common';
import { PaymentController } from './adapters/controllers/payment.controller';
import { StartPaymentUseCase } from './application/use-cases/start-payment.use-case';
import { PrismaPaymentRepository } from './infrastructure/repositories/prisma-payment.repository';
import { PrismaService } from './prisma/prisma.service';

@Module({
  controllers: [PaymentController],
  providers: [
    PrismaService,
    PrismaPaymentRepository,
    {
      provide: 'PaymentRepository',
      useClass: PrismaPaymentRepository,
    },
    StartPaymentUseCase,
  ],
})
export class PaymentsModule {}
