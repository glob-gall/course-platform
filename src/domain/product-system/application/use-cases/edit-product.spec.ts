import { makeProduct } from '@/test/factories/make-product';
import { EditProductUsecase } from './edit-product.usecase';
import { InMemoryProductsRepository } from '@/test/repositories/im-memory-products.repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';

let productsRepository: InMemoryProductsRepository;
let sut: EditProductUsecase;

describe('Edit Product Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();

    sut = new EditProductUsecase(productsRepository);
  });

  it('should be able to edit a product', async () => {
    const product = makeProduct({
      PriceInCents: 200,
    });
    productsRepository.items.push(product);

    const response = await sut.exec({
      id: product.id.toString(),
      PriceInCents: 100,
      title: 'title-changed',
    });

    expect(response.isRight()).toBeTruthy();

    expect(productsRepository.items[0]).toEqual(
      expect.objectContaining({
        title: 'title-changed',
        PriceInCents: 100,
      }),
    );
  });

  it('should not able to edit a product that do not exists', async () => {
    const response = await sut.exec({
      id: 'not-existenst-id',
      PriceInCents: 100,
      title: 'title-changed',
    });

    expect(response.isLeft()).toBeTruthy();

    expect(response.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
