import { Product } from '../../entities/product.entity';
import { makeProduct } from '@/test/factories/make-product';
import { sumProductPrices } from './sum-product-prices';
import { createDate } from '@/core/utils/create-date';

const sut = sumProductPrices;

describe('Sum Product Prices', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to sum product prices correctly', async () => {
    vi.setSystemTime(createDate({ year: 2025, day: 5, month: 0 })); // 01/01/2025
    const today = new Date();

    const products: Product[] = [];
    for (let i = 0; i < 5; i++) {
      products.push(
        makeProduct({
          priceInCents: 10000,
        }),
      );
    }
    const response = sut(products, today);

    expect(response).toEqual(10000 * 5);
  });

  it('should be able to sum product with promo prices correctly', async () => {
    vi.setSystemTime(createDate({ year: 2025, day: 5, month: 0 })); // 01/01/2025
    const today = new Date();

    const products: Product[] = [];

    const product1 = makeProduct({
      priceInCents: 1000,
      promoPriceInCents: 100,
      maxDatePromoPrice: createDate({ year: 2025, day: 6, month: 0 }),
    });
    const product2 = makeProduct({
      priceInCents: 2000,
      promoPriceInCents: 200,
      maxDatePromoPrice: createDate({ year: 2025, day: 5, month: 0 }),
    });
    const product3 = makeProduct({
      priceInCents: 4000,
      promoPriceInCents: 400,
      maxDatePromoPrice: createDate({ year: 2025, day: 4, month: 0 }),
    });

    products.push(product1, product2, product3);

    const response = sut(products, today);

    expect(response).toEqual(100 + 200 + 4000);
  });
});
