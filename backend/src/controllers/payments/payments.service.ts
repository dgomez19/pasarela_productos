import { Injectable, NotFoundException, Ip } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { Payment } from '@prisma/client';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  STATUS_PAYMENT_PENDING = 'PENDING';
  STATUS_PAYMENT_APPROVED = 'APPROVED';
  STATUS_PAYMENT_DECLINED = 'DECLINED';
  STATUS_PAYMENT_ERROR = 'ERROR';

  private async generatepaymentId() {
    try {
      let result = '';

      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      const charactersLength = characters.length;

      let counter = 0;

      while (counter < 10) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength),
        );
        counter += 1;
      }

      return result;
    } catch (error) {
      throw new NotFoundException('¡ERROR!', {
        description: error,
      });
    }

    // <TODO> Consultar si el id ya existe, lo genere nuevamente.
  }

  private async checkPendingPayments(productId, ip) {
    return this.prisma.payment.findFirst({
      where: {
        status: this.STATUS_PAYMENT_PENDING,
        productId: productId,
        userIp: ip,
      },
    });
  }

  async startPayment(data: Payment, ip): Promise<Payment> {
    const paymentId = await this.generatepaymentId();

    const isPending = await this.checkPendingPayments(data.productId, ip);

    // if (isPending) {
    //   throw new NotFoundException('¡ERROR!', {
    //     description:
    //       'En este momento tiene una compra pendiente para este producto. Por favor espere unos minutos y vuelva a intentar.',
    //   });
    // }

    data['paymentId'] = paymentId;
    data['userIp'] = ip;

    return this.prisma.payment.create({
      data,
    });
  }
}
