import { Either, right } from '@/core/types/either';
import { Product } from '../../entities/product.entity';
import { ProductsRepository } from '../repositories/products.repository';
import { Injectable } from '@nestjs/common';

type FetchManyProductsResponse = Either<null, { products: Product[] }>;

@Injectable()
export class FetchManyProductsUsecase {
  constructor(private productsRepository: ProductsRepository) {}

  async exec(): Promise<FetchManyProductsResponse> {
    const products = await this.productsRepository.findMany();
    return right({ products });
  }
}
