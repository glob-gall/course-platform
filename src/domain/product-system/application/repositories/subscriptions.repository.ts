import { Subscription } from '../../entities/subscription.entity';

export abstract class SubscriptionsRepository {
  abstract create(subscription: Subscription): Promise<void>;
  abstract save(subscription: Subscription): Promise<void>;
  abstract findById(id: string): Promise<Subscription | null>;
  abstract delete(id: string): Promise<void>;
  abstract findMany(): Promise<Subscription[]>;
}
