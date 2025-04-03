import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Subscription } from '@/domain/product-system/entities/subscription.entity';
import { Subscription as PrismaSubscription } from '@prisma/client';

export class PrismaSubscriptionMapper {
  static toPrisma(subscription: Subscription): PrismaSubscription {
    return {
      id: subscription.id.toString(),
      description: subscription.description ?? null,
      cycle: subscription.cycle,
      priceInCents: subscription.priceInCents,
      title: subscription.title,
      createdAt: subscription.createdAt,
    };
  }

  static toDomain(raw: PrismaSubscription): Subscription {
    const subscription = Subscription.create(
      {
        courses: [],
        cycle: raw.cycle,
        priceInCents: raw.priceInCents,
        title: raw.title,
        description: raw.description,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    );

    return subscription;
  }
}
