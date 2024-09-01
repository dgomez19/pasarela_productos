import { Decimal } from '@prisma/client/runtime/library';

export class Payment {
  id: number;
  productId: number;
  name: string;
  email: string;
  bank_account: string;
  description: string;
  paymentId: string;
  status: string;
  value: Decimal;
  userIp: string;
  bank: string;
  cus: string;
  urlRedirect: string;
  valueDelivery: Decimal;
  address: string;
  paymentWompiId: number;
}
