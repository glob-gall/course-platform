import { Either } from '@/core/types/either';
import { PaymentType } from './enum/payment-type';
import { PaymentCycle } from './enum/payment_cycle';
import { PaymentProfileAlreadyExistsError } from './error/payment-profile-already-exists.error';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';

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

export type CreateUserResponse = Either<
  PaymentProfileAlreadyExistsError | ResourceNotFoundError,
  null
>;
export type CreateChargeResponse = Either<ResourceNotFoundError, null>;
export type CreateSubscriptionResponse = Either<ResourceNotFoundError, null>;
export abstract class PaymentService {
  abstract createUser(params: CreateUserParams): Promise<CreateUserResponse>;
  abstract createCharge(
    params: CreateChargeParams,
  ): Promise<CreateChargeResponse>;
  abstract createSubscription(
    params: CreateSubscriptionParams,
  ): Promise<CreateSubscriptionResponse>;

  // abstract updateChargeStatusHook(params: unknown): Promise<unknown>;
  // abstract updateSubscriptionStatusHook(params: unknown): Promise<unknown>;
}
