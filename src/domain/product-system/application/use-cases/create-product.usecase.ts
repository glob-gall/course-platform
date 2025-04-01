import { Either, left, right } from '@/core/types/either';
import { Product } from '../../entities/product.entity';
import { ProductsRepository } from '../repositories/products.repository';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { CoursesRepository } from '@/domain/course-platform/application/repositories/courses.repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';

interface CreateProductRequest {
  title: string;
  description?: string;
  courses: string[];
  PriceInCents: number;
  PromoPriceInCents?: number;
  maxDatePromoPrice?: Date;
}

type CreateProductResponse = Either<
  ResourceNotFoundError,
  { product: Product }
>;

export class CreateProductUsecase {
  constructor(
    private productsRepository: ProductsRepository,
    private coursesRepository: CoursesRepository,
  ) {}

  async exec({
    title,
    description,
    PriceInCents,
    courses,
    PromoPriceInCents,
    maxDatePromoPrice,
  }: CreateProductRequest): Promise<CreateProductResponse> {
    const findedCourses = await this.coursesRepository.findManyByIds(courses);
    if (courses.length !== findedCourses.length)
      return left(new ResourceNotFoundError());

    const product = Product.create({
      title,
      description,
      courses: courses.map((courseId) => new UniqueEntityID(courseId)),
      PriceInCents,
      PromoPriceInCents,
      maxDatePromoPrice,
    });

    await this.productsRepository.create(product);
    return right({ product });
  }
}
