import { Either } from '@/core/types/either';
import { PaymentType } from './enum/payment-type';
import { PaymentCycle } from './enum/payment_cycle';
import { PaymentProfileAlreadyExistsError } from './error/payment-profile-already-exists.error';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { NoPaymentProfileError } from './error/no-payment-profile.error';

export interface Profile {
  cpf: string;
  asaasId: string;
  userId: string;
}

export interface CreatePaymentProfileParams {
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

export type FindPaymentProfileResponse = Either<null, { profileToken: string }>;
export type CreatePaymentProfileResponse = Either<
  PaymentProfileAlreadyExistsError | ResourceNotFoundError,
  { profileToken: string }
>;

type ChargeInfo = {
  paymentSystemId: string;
  chargeUrl: string;
};

export type CreateChargeResponse = Either<
  ResourceNotFoundError | NoPaymentProfileError,
  ChargeInfo
>;
export type CreateSubscriptionResponse = Either<ResourceNotFoundError, null>;

export abstract class PaymentService {
  abstract findPaymentProfile(
    userId: string,
  ): Promise<FindPaymentProfileResponse>;

  abstract createPaymentProfile(
    params: CreatePaymentProfileParams,
  ): Promise<CreatePaymentProfileResponse>;

  abstract createCharge(
    params: CreateChargeParams,
  ): Promise<CreateChargeResponse>;

  abstract createSubscription(
    params: CreateSubscriptionParams,
  ): Promise<CreateSubscriptionResponse>;

  // abstract updateChargeStatusHook(params: unknown): Promise<unknown>;
  // abstract updateSubscriptionStatusHook(params: unknown): Promise<unknown>;
}
