import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Purchase } from '@/domain/product-system/entities/purchase.entity';
import { Purchase as PrismaPurchase } from '@prisma/client';

export class PrismaPurchaseMapper {
  static toPrisma(purchase: Purchase): PrismaPurchase {
    return {
      id: purchase.id.toString(),
      paymentStatus: purchase.paymentStatus,
      paymentType: purchase.type,
      totalPriceInCents: purchase.totalPriceInCents,
      createdAt: purchase.createdAt,
      userId: purchase.userId.toString(),
    };
  }

  static toDomain(raw: PrismaPurchase): Purchase {
    const purchase = Purchase.create(
      {
        paymentStatus: raw.paymentStatus,
        products: [],
        totalPriceInCents: raw.totalPriceInCents,
        type: raw.paymentType,
        userId: new UniqueEntityID(raw.userId),
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    );

    return purchase;
  }
}
