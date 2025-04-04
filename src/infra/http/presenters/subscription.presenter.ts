import { Subscription } from '@/domain/product-system/entities/subscription.entity';

export class SubscriptionPresenter {
  static toHTTP(subscription: Subscription) {
    return {
      id: subscription.id.toString(),
      title: subscription.title,
      description: subscription.description,
      cycle: subscription.cycle,
      priceInCents: subscription.priceInCents,

      updatedAt: subscription.updatedAt,
      createdAt: subscription.createdAt,
    };
  }
}
