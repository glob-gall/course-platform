import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Purchase } from '@/domain/product-system/entities/purchase.entity';
import { Prisma, Purchase as PrismaPurchase } from '@prisma/client';
import { PrismaProductMapper } from './prisma-product.mapper';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sectionWithProduct = Prisma.validator<Prisma.PurchaseDefaultArgs>()({
  include: {
    purchaseProduct: {
      include: {
        product: true,
      },
    },
  },
});

type PurchaseWithProduct = Prisma.PurchaseGetPayload<typeof sectionWithProduct>;

export class PrismaPurchaseWithProductMapper {
  static toPrisma(purchase: Purchase): PrismaPurchase {
    return {
      id: purchase.id.toString(),
      paymentStatus: purchase.paymentStatus,
      paymentType: purchase.type,
      totalPriceInCents: purchase.totalPriceInCents,
      createdAt: purchase.createdAt,
      userId: purchase.userId.toString(),

      chargeUrl: purchase.chargeUrl,
      externalId: purchase.externalId,
    };
  }

  static toDomain(raw: PurchaseWithProduct): Purchase {
    const purchase = Purchase.create(
      {
        paymentStatus: raw.paymentStatus,
        chargeUrl: raw.chargeUrl,
        externalId: raw.externalId,
        products: raw.purchaseProduct.map((pp) =>
          PrismaProductMapper.toDomain(pp.product),
        ),
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
