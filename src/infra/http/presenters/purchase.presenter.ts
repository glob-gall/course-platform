import { Purchase } from '@/domain/product-system/entities/purchase.entity';

export class PurchasePresenter {
  static toHTTP(purchase: Purchase) {
    return {
      id: purchase.id.toString(),
      status: purchase.paymentStatus,
      products: purchase.products,
      totalPriceInCents: purchase.totalPriceInCents,
      type: purchase.type,
      createdAt: purchase.createdAt,
    };
  }
}
