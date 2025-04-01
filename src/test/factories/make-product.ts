import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import {
  Product,
  ProductProps,
} from '@/domain/product-system/entities/product.entity';

export function makeProduct(
  override: Partial<ProductProps> = {},
  id?: UniqueEntityID,
) {
  const product = Product.create(
    {
      title: faker.word.words(4),
      courses: [],
      description: faker.lorem.text(),
      PriceInCents: faker.number.int({ min: 10, max: 5000 }),
      ...override,
    },
    id,
  );

  return product;
}
