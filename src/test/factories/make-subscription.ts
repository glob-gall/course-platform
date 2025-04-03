import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import {
  Subscription,
  SubscriptionProps,
} from '@/domain/product-system/entities/subscription.entity';

export function makeSubscription(
  override: Partial<SubscriptionProps> = {},
  id?: UniqueEntityID,
) {
  const subscription = Subscription.create(
    {
      courses: [],
      description: faker.lorem.text(),
      cycle: 'MONTHLY',
      title: faker.word.words(3),
      priceInCents: faker.number.int({ min: 10, max: 5000 }),
      ...override,
    },
    id,
  );

  return subscription;
}
