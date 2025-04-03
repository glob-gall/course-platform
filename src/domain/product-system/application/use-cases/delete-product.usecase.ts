import { Either, left, right } from '@/core/types/either';
import { ProductsRepository } from '../repositories/products.repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { Injectable } from '@nestjs/common';

interface DeleteProductRequest {
  id: string;
}

type DeleteProductResponse = Either<ResourceNotFoundError, null>;

@Injectable()
export class DeleteProductUsecase {
  constructor(private productsRepository: ProductsRepository) {}

  async exec({ id }: DeleteProductRequest): Promise<DeleteProductResponse> {
    const product = await this.productsRepository.findById(id);
    if (!product) return left(new ResourceNotFoundError());

    await this.productsRepository.delete(id);
    return right(null);
  }
}
