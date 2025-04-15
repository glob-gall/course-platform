import { Product } from '@/domain/product-system/entities/product.entity';
import { PurchaseProduct as PrismaPurchaseProduct } from '@prisma/client';

export class PrismaPurchaseProductMapper {
  static toPrisma(product: Product, purchaseId: string): PrismaPurchaseProduct {
    return {
      productId: product.id.toString(),
      purchaseId: purchaseId,
    };
  }
}
