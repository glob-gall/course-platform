import { Product } from '../../entities/product.entity';

export abstract class ProductsRepository {
  abstract create(product: Product): Promise<void>;
  abstract save(product: Product): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<Product | null>;
  abstract findDetailsById(id: string): Promise<Product | null>;
  abstract findManyByIds(ids: string[]): Promise<Product[]>;
  abstract findMany(): Promise<Product[]>;
}
