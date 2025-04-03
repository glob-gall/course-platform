import { makeProduct } from '@/test/factories/make-product';
import { CreateProductUsecase } from './create-product.usecase';
import { InMemoryProductsRepository } from '@/test/repositories/im-memory-products.repository';
import { InMemoryCoursesRepository } from '@/test/repositories/im-memory-courses.repository';

let productsRepository: InMemoryProductsRepository;
let coursesRepository: InMemoryCoursesRepository;
let sut: CreateProductUsecase;

describe('Create Product Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();

    coursesRepository = new InMemoryCoursesRepository();
    sut = new CreateProductUsecase(productsRepository, coursesRepository);
  });

  it('should be able to create a product', async () => {
    const product = makeProduct();

    const response = await sut.exec({
      courses: [],
      priceInCents: product.priceInCents,
      title: product.title,
      description: product.description,
      promoPriceInCents: product.promoPriceInCents,
      maxDatePromoPrice: product.maxDatePromoPrice,
    });

    expect(response.isRight()).toBeTruthy();

    expect(productsRepository.items[0]).toEqual(
      expect.objectContaining({
        title: product.title,
        priceInCents: product.priceInCents,
      }),
    );
  });
});
