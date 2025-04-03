import { PaymentSystemError } from '@/core/errors/payment-system.error';

export class PaymentProfileAlreadyExistsError
  extends Error
  implements PaymentSystemError
{
  constructor() {
    super('Payment Profile already exists.');
  }
}
