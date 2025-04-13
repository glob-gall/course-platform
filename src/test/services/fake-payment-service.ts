import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { left, right } from '@/core/types/either';
import {
  CreateChargeParams,
  CreateChargeResponse,
  CreatePaymentProfileParams,
  CreatePaymentProfileResponse,
  CreateSubscriptionParams,
  CreateSubscriptionResponse,
  FindPaymentProfileResponse,
  PaymentService,
} from '@/domain/product-system/payment-service/payment.service';
import { Injectable } from '@nestjs/common';

type PaymentProfile = {
  id: UniqueEntityID;
  cpf: string;
  email: string;
  asaasId?: string;
  userId: string;
};
type FakeCharge = {
  userId: string;
  paymentType: string;
  value: number;
};
type FakeSubscription = {
  customerId: string;
  cycle: string;
  paymentType: string;
  value: number;
};

@Injectable()
export class FakePaymentService implements PaymentService {
  public profiles: PaymentProfile[] = [];
  public charges: FakeCharge[] = [];
  public subscriptions: FakeSubscription[] = [];

  async findPaymentProfile(
    userId: string,
  ): Promise<FindPaymentProfileResponse> {
    const profile = this.profiles.find((p) => p.userId === userId);
    if (!profile) left(new ResourceNotFoundError());
    return right({ profileToken: userId });
  }

  async createPaymentProfile({
    cpf,
    email,
  }: CreatePaymentProfileParams): Promise<CreatePaymentProfileResponse> {
    const id = new UniqueEntityID();
    this.profiles.push({ cpf, email, id, userId: '' });

    return right({
      profileToken: id.toString(),
    });
  }

  async createCharge({
    paymentType,
    userId,
    value,
  }: CreateChargeParams): Promise<CreateChargeResponse> {
    this.charges.push({
      paymentType,
      userId,
      value,
    });
    return right(null);
  }

  async createSubscription({
    customerId,
    cycle,
    paymentType,
    value,
  }: CreateSubscriptionParams): Promise<CreateSubscriptionResponse> {
    this.subscriptions.push({
      customerId,
      cycle,
      paymentType,
      value,
    });
    return right(null);
  }
}
