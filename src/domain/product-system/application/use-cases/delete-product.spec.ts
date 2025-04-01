import { makeProduct } from '@/test/factories/make-product';
import { InMemoryProductsRepository } from '@/test/repositories/im-memory-products.repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { DeleteProductUsecase } from './delete-product.usecase';

let productsRepository: InMemoryProductsRepository;
let sut: DeleteProductUsecase;

describe('Edit Product Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();

    sut = new DeleteProductUsecase(productsRepository);
  });

  it('should be able to delete a product', async () => {
    const product = makeProduct({
      PriceInCents: 200,
    });
    productsRepository.items.push(product);

    const response = await sut.exec({
      id: product.id.toString(),
    });

    expect(response.isRight()).toBeTruthy();

    expect(productsRepository.items).toHaveLength(0);
  });

  it('should not able to delete a product that do not exists', async () => {
    const response = await sut.exec({
      id: 'not-existenst-id',
    });

    expect(response.isLeft()).toBeTruthy();

    expect(response.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
