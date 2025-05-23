import { Either, left, right } from '@/core/types/either';
import { Product } from '../../entities/product.entity';
import { ProductsRepository } from '../repositories/products.repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { Injectable } from '@nestjs/common';

interface EditProductRequest {
  id: string;
  title: string;
  description?: string;
  priceInCents: number;
  promoPriceInCents?: number;
  maxDatePromoPrice?: Date;
}

type EditProductResponse = Either<ResourceNotFoundError, { product: Product }>;

@Injectable()
export class EditProductUsecase {
  constructor(private productsRepository: ProductsRepository) {}

  async exec({
    id,
    title,
    description,
    priceInCents,
    promoPriceInCents,
    maxDatePromoPrice,
  }: EditProductRequest): Promise<EditProductResponse> {
    const product = await this.productsRepository.findById(id);
    if (!product) return left(new ResourceNotFoundError());

    product.title = title;
    product.description = description;
    product.priceInCents = priceInCents;
    product.promoPriceInCents = promoPriceInCents;
    product.maxDatePromoPrice = maxDatePromoPrice;

    await this.productsRepository.save(product);
    return right({ product });
  }
}
