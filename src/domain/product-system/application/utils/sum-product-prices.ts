import { Product } from '../../entities/product.entity';

export function sumProductPrices(products: Product[], maxPromoDate: Date) {
  const totalPrice = products.reduce((acc, current) => {
    let price = current.priceInCents;

    if (
      current.maxDatePromoPrice &&
      current.promoPriceInCents &&
      maxPromoDate <= current.maxDatePromoPrice
    ) {
      price = current.promoPriceInCents;
    }
    return acc + price;
  }, 0);

  return totalPrice;
}
