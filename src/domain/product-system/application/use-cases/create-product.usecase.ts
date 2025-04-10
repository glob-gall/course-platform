import { Either, left, right } from '@/core/types/either';
import { Product } from '../../entities/product.entity';
import { ProductsRepository } from '../repositories/products.repository';
import { CoursesRepository } from '@/domain/course-platform/application/repositories/courses.repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { Injectable } from '@nestjs/common';

interface CreateProductRequest {
  title: string;
  description?: string;
  courses: string[];
  priceInCents: number;
  promoPriceInCents?: number | null;
  maxDatePromoPrice?: Date | null;
}

type CreateProductResponse = Either<
  ResourceNotFoundError,
  { product: Product }
>;

@Injectable()
export class CreateProductUsecase {
  constructor(
    private productsRepository: ProductsRepository,
    private coursesRepository: CoursesRepository,
  ) {}

  async exec({
    title,
    description,
    priceInCents,
    courses,
    promoPriceInCents,
    maxDatePromoPrice,
  }: CreateProductRequest): Promise<CreateProductResponse> {
    const findedCourses = await this.coursesRepository.findManyByIds(courses);
    if (courses.length !== findedCourses.length)
      return left(new ResourceNotFoundError());

    const product = Product.create({
      title,
      description,
      courses: findedCourses,
      priceInCents,
      promoPriceInCents,
      maxDatePromoPrice,
    });

    await this.productsRepository.create(product);
    return right({ product });
  }
}
