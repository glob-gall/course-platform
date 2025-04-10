import { makeProduct } from '@/test/factories/make-product';
import { InMemoryProductsRepository } from '@/test/repositories/im-memory-products.repository';
import { makeCourse } from '@/test/factories/make-course';
import { GetProductDetailsUsecase } from './get-product-details.usecase';

let productsRepository: InMemoryProductsRepository;
let sut: GetProductDetailsUsecase;

describe('Get Product by id Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();

    sut = new GetProductDetailsUsecase(productsRepository);
  });

  it('should be able to fetch product details', async () => {
    const course1 = makeCourse();
    const course2 = makeCourse();

    const product = makeProduct({
      courses: [course1, course2],
    });
    productsRepository.items.push(product);

    const response = await sut.exec(product.id.toString());

    expect(response.isRight()).toBeTruthy();
    expect(response.value).toEqual({
      product: product,
    });
  });
});
