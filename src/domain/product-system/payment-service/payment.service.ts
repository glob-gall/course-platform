import { PaymentType } from './enum/payment-type';
import { PaymentCycle } from './enum/payment_cycle';

export interface CreateUserParams {
  email: string;
  cpf: string;
}

export interface CreateChargeParams {
  userId: string;
  paymentType: PaymentType;
  value: number;
}

export interface CreateSubscriptionParams {
  customerId: string;
  paymentType: PaymentType;
  value: number;
  cycle: PaymentCycle;
}

export abstract class PaymentService {
  abstract createUser(params: CreateUserParams): Promise<unknown>;
  abstract createCharge(params: CreateChargeParams): Promise<unknown>;
  abstract createSubscription(
    params: CreateSubscriptionParams,
  ): Promise<unknown>;

  // abstract updateChargeStatusHook(params: unknown): Promise<unknown>;
  // abstract updateSubscriptionStatusHook(params: unknown): Promise<unknown>;
}
