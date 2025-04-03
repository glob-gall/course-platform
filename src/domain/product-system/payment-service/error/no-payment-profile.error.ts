import { PaymentSystemError } from '@/core/errors/payment-system.error';

export class NoPaymentProfileError extends Error implements PaymentSystemError {
  constructor() {
    super('No Payment Profile Found');
  }
}
