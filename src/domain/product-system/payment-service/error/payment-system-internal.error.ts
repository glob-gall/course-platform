import { PaymentSystemError } from '@/core/errors/payment-system.error';

export class PaymentSystemInternalError
  extends Error
  implements PaymentSystemError
{
  constructor() {
    super('PAYMENT_SYSTEM_INTERNAL');
  }
}
