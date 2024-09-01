import { PaymentRepository } from '../../domain/repositories/payment.repository';
import { Payment } from '../../domain/entities/payment.entity';

export class StartPaymentUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute(data: Payment, ip: string): Promise<Payment> {
    // Genera un paymentId y otras lógicas
    data.paymentId = this.generatePaymentId();
    data.userIp = ip;

    // Verificación de producto y otras validaciones podrían ir aquí

    // Llamada al repositorio para crear el pago
    return this.paymentRepository.create(data);
  }

  private generatePaymentId(): string {
    // Lógica de generación de ID
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result;
  }
}
