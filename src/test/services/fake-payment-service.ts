import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { right } from '@/core/types/either';
import {
  CreateChargeParams,
  CreateChargeResponse,
  CreateSubscriptionParams,
  CreateSubscriptionResponse,
  CreateUserParams,
  CreateUserResponse,
  PaymentService,
} from '@/domain/product-system/payment-service/payment.service';

type FakeUser = {
  id: UniqueEntityID;
  cpf: string;
  email: string;
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

export class FakePaymentService implements PaymentService {
  public users: FakeUser[] = [];
  public charges: FakeCharge[] = [];
  public subscriptions: FakeSubscription[] = [];

  async createUser({
    cpf,
    email,
  }: CreateUserParams): Promise<CreateUserResponse> {
    this.users.push({ cpf, email, id: new UniqueEntityID() });

    return right(null);
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
