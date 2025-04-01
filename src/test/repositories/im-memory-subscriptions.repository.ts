import { SubscriptionsRepository } from '@/domain/product-system/application/repositories/subscriptions.repository';
import { Subscription } from '@/domain/product-system/entities/subscription.entity';

export class InMemorySubscriptionsRepository
  implements SubscriptionsRepository
{
  public items: Subscription[] = [];

  async create(subscription: Subscription): Promise<void> {
    this.items.push(subscription);
  }

  async save(subscription: Subscription): Promise<void> {
    const index = this.items.findIndex((item) => item.id === subscription.id);
    this.items[index] = subscription;
  }

  async findById(id: string): Promise<Subscription | null> {
    const subscription = this.items.find((item) => item.id.toString() === id);
    if (!subscription) return null;
    return subscription;
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id.toString() === id);
    this.items.splice(index, 1);
  }

  async findMany(): Promise<Subscription[]> {
    return this.items;
  }
}
