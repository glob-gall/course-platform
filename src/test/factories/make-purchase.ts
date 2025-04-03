import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import {
  Purchase,
  PurchaseProps,
} from '@/domain/product-system/entities/purchase.entity';

export function makePurchase(
  override: Partial<PurchaseProps> = {},
  id?: UniqueEntityID,
) {
  const purchase = Purchase.create(
    {
      paymentStatus: 'PENDING',
      products: [new UniqueEntityID()],
      userId: new UniqueEntityID(),
      type: 'PIX',
      totalPriceInCents: faker.number.int({ min: 10, max: 5000 }),
      ...override,
    },
    id,
  );

  return purchase;
}
