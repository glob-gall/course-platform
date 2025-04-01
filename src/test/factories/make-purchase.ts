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
      paymentstatus: 'PENDING',
      products: [new UniqueEntityID()],
      userId: new UniqueEntityID(),
      type: 'PIX',
      totalpriceInCents: faker.number.int({ min: 10, max: 5000 }),
      ...override,
    },
    id,
  );

  return purchase;
}
