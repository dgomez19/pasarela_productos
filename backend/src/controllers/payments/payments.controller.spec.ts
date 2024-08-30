import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { Payment } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let service: PaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        {
          provide: PaymentsService,
          useValue: {
            startPayment: jest.fn(),
            verifyPaymentByPaymentWompiId: jest.fn(),
            verifyPayment: jest.fn(),
            listeningPayment: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    service = module.get<PaymentsService>(PaymentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('startPayment', () => {
    it('should call PaymentsService.startPayment with correct parameters', async () => {
      const paymentData: Payment = {
        id: 1,
        productId: 1,
        name: 'Daniel',
        email: 'daniel.gomez922@gmail.com',
        bank_account: '1',
        description: '1',
        paymentId: '1',
        status: 'PENDIENTE',
        value: new Decimal(1),
        userIp: '1',
        bank: '1',
        cus: '1',
        urlRedirect: '1',
        valueDelivery: new Decimal(1),
        address: '1',
        paymentWompiId: '1',
      };

      const ip = '127.0.0.1';
      await controller.startPayment(paymentData, ip);
      expect(service.startPayment).toHaveBeenCalledWith(paymentData, ip);
    });
  });

  describe('verifyPaymentByPaymentWompiId', () => {
    it('should call PaymentsService.verifyPaymentByPaymentWompiId with correct id', async () => {
      const paymentWompiId = 'some-id';
      await controller.verifyPaymentByPaymentWompiId(paymentWompiId);
      expect(service.verifyPaymentByPaymentWompiId).toHaveBeenCalledWith(
        paymentWompiId,
      );
    });
  });

  describe('verifyPayment', () => {
    it('should call PaymentsService.verifyPayment', async () => {
      await controller.verifyPayment();
      expect(service.verifyPayment).toHaveBeenCalled();
    });
  });

  describe('listeningPayment', () => {
    it('should call PaymentsService.listeningPayment with correct data', async () => {
      const data = { key: 'value' };
      await controller.listeningPayment(data);
      expect(service.listeningPayment).toHaveBeenCalledWith(data);
    });
  });
});
