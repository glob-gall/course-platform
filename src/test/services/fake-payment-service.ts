import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import {
  CreateChargeParams,
  CreateSubscriptionParams,
  CreateUserParams,
  PaymentService,
} from '@/domain/product-system/payment-service/payment-service';

type FakeUser = {
  id: string;
  cpf: string;
  email: string;
  name: string;
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

  async createUser({ cpf, email, name }: CreateUserParams): Promise<void> {
    this.users.push({ cpf, email, id: new UniqueEntityID().toString(), name });
  }

  async createCharge({
    userId,
    paymentType,
    value,
  }: CreateChargeParams): Promise<void> {
    this.charges.push({ paymentType, userId, value });
  }

  async createSubscription({
    customerId,
    cycle,
    paymentType,
    value,
  }: CreateSubscriptionParams): Promise<void> {
    this.subscriptions.push({ customerId, cycle, paymentType, value });
  }
}
