import {
  Injectable,
  NotFoundException,
  Ip,
  HttpException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { Payment } from '@prisma/client';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { ProductsService } from '../products/products.service';

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
    private product: ProductsService,
  ) {}

  STATUS_PAYMENT_PENDING = 'PENDING';
  STATUS_PAYMENT_APPROVED = 'APPROVED';
  STATUS_PAYMENT_DECLINED = 'DECLINED';
  STATUS_PAYMENT_ERROR = 'ERROR';

  PAYMENT_URL_TRANSACTION = 'https://api-sandbox.wompi.co/v1/transactions/';

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

  async getAllPaymentsPending(): Promise<Payment[]> {
    return this.prisma.payment.findMany({
      where: {
        status: this.STATUS_PAYMENT_PENDING,
        NOT: [
          {
            paymentWompiId: null,
          },
        ],
      },
    });
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

  private async getPaymentByPaymentId(paymentId) {
    return this.prisma.payment.findFirst({
      where: {
        paymentId: paymentId,
      },
    });
  }

  async getPaymentByWompiId(id: string): Promise<Payment> {
    return this.prisma.payment.findFirst({
      where: {
        paymentWompiId: id,
      },
      include: {
        product: true,
      },
    });
  }

  async updatePayment(id: number, data: Payment): Promise<Payment> {
    return this.prisma.payment.update({
      where: {
        id: id,
      },
      data,
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

  private async discountProduct(id: number) {
    const product = await this.product.getProductById(id);

    product.quantityAvailable = (product.quantityAvailable - 1);
    this.product.updateProduct(id, product);
  }

  async listeningPayment(data) {
    if (Object.keys(data).length === 0) {
      throw new NotFoundException('¡ERROR!', {
        description: 'No se encontraron datos en el body',
      });
    }

    try {
      const payment = await this.getPaymentByPaymentId(
        data.data.transaction.reference,
      );

      if (!payment) {
        throw new NotFoundException('¡ERROR!', {
          description: 'No se encontraron datos del pago',
        });
      }

      payment.status = data.data.transaction.status;
      payment.paymentWompiId = data.data.transaction.id;

      // console.log('XXXX', data.transaction.customer_data);

      if (data.data.transaction.status === this.STATUS_PAYMENT_APPROVED) {
        this.discountProduct(payment.productId);
      }

      return this.updatePayment(payment.id, payment);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async verifyPayment() {
    const paymentsPending = await this.getAllPaymentsPending();

    await paymentsPending.forEach(async (value) => {
      const { data } = await firstValueFrom(
        this.httpService
          .get(`${this.PAYMENT_URL_TRANSACTION}${value.paymentWompiId}`)
          .pipe(
            catchError((error: AxiosError) => {
              throw 'An error happened!';
            }),
          ),
      );

      const newData = {
        data: {
          transaction: data.data,
        },
      };

      await this.listeningPayment(newData);
    });
  }

  async verifyPaymentByPaymentWompiId(id) {
    return await this.getPaymentByWompiId(id);
  }
}
