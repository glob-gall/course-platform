import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Product } from '@/domain/product-system/entities/product.entity';
import { Product as PrismaProduct } from '@prisma/client';

export class PrismaProductMapper {
  static toPrisma(product: Product): PrismaProduct {
    return {
      id: product.id.toString(),
      description: product.description ?? null,
      priceInCents: product.priceInCents,
      maxDatePromoPrice: product.maxDatePromoPrice ?? null,
      promoPriceInCents: product.promoPriceInCents ?? null,
      title: product.title,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt ?? null,
    };
  }

  static toDomain(raw: PrismaProduct): Product {
    const product = Product.create(
      {
        description: raw.description ?? '',
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        courses: [],
        priceInCents: raw.priceInCents,
        title: raw.title,
        maxDatePromoPrice: raw.maxDatePromoPrice,
        promoPriceInCents: raw.promoPriceInCents,
      },
      new UniqueEntityID(raw.id),
    );

    return product;
  }
}
