import { makeProduct } from '@/test/factories/make-product';
import { InMemoryProductsRepository } from '@/test/repositories/im-memory-products.repository';
import { FetchManyProductsUsecase } from './fetch-many-products.usecase';

let productsRepository: InMemoryProductsRepository;
let sut: FetchManyProductsUsecase;

describe('Fetch Many Products Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();

    sut = new FetchManyProductsUsecase(productsRepository);
  });

  it('should be able to fetch many products', async () => {
    const product1 = makeProduct();
    const product2 = makeProduct();
    productsRepository.items.push(product1, product2);

    const response = await sut.exec();

    expect(response.isRight()).toBeTruthy();

    expect(response.value).toEqual({
      products: expect.arrayContaining([product1, product2]),
    });
  });
});
