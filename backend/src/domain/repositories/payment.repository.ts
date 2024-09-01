import { Payment } from '../entities/payment.entity';

export interface PaymentRepository {
  findAllPending(): Promise<Payment[]>;
  findByPaymentId(paymentId: string): Promise<Payment | null>;
  findByWompiId(id: string): Promise<Payment | null>;
  create(data: Payment): Promise<Payment>;
  update(id: number, data: Payment): Promise<Payment>;
}
