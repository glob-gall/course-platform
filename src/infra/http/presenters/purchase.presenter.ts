import { Purchase } from '@/domain/product-system/entities/purchase.entity';
import { ProductPresenter } from './product.presenter';

export class PurchasePresenter {
  static toHTTP(purchase: Purchase) {
    return {
      id: purchase.id.toString(),
      status: purchase.paymentStatus,
      products: purchase.products.map(ProductPresenter.toHTTP),
      totalPriceInCents: purchase.totalPriceInCents,
      chargeUrl: purchase.chargeUrl,
      type: purchase.type,
      createdAt: purchase.createdAt,
    };
  }
}
