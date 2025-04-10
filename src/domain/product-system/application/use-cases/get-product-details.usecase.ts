import { Either, left, right } from '@/core/types/either';
import { ProductsRepository } from '../repositories/products.repository';
import { Injectable } from '@nestjs/common';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { Product } from '../../entities/product.entity';

type GetProductDetailsResponse = Either<
  ResourceNotFoundError,
  { product: Product }
>;

@Injectable()
export class GetProductDetailsUsecase {
  constructor(private productsRepository: ProductsRepository) {}

  async exec(id: string): Promise<GetProductDetailsResponse> {
    const product = await this.productsRepository.findDetailsById(id);

    if (!product) return left(new ResourceNotFoundError());

    return right({
      product,
    });
  }
}
