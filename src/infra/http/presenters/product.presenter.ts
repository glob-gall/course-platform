import { Product } from '@/domain/product-system/entities/product.entity';

export class ProductPresenter {
  static toHTTP(product: Product) {
    return {
      id: product.id.toString(),
      title: product.title,
      description: product.description,
      courses: product.courses,
      priceInCents: product.priceInCents,
      promoPriceInCents: product.promoPriceInCents,
      maxDatePromoPrice: product.maxDatePromoPrice,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
