import { Course } from '@/domain/course-platform/entities/course.entity';
import { SectionItem } from '@/domain/course-platform/entities/section-item.entity';
import { Section } from '@/domain/course-platform/entities/section.entity';
import { ProductsRepository } from '@/domain/product-system/application/repositories/products.repository';
import { Product } from '@/domain/product-system/entities/product.entity';

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = [];
  public courses: Course[] = [];
  public sections: Section[] = [];
  public sectionItems: SectionItem[] = [];

  async create(product: Product): Promise<void> {
    this.items.push(product);
  }
  async save(product: Product): Promise<void> {
    const index = this.items.findIndex((item) => item.id === product.id);
    this.items[index] = product;
  }
  async findById(id: string): Promise<Product | null> {
    const product = this.items.find((item) => item.id.toString() === id);
    if (!product) return null;
    return product;
  }

  async findDetailsById(id: string): Promise<Product | null> {
    const product = this.items.find((item) => item.id.toString() === id);
    if (!product) return null;

    return product;
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id.toString() === id);
    this.items.splice(index, 1);
  }
  async findMany(): Promise<Product[]> {
    return this.items;
  }

  async findManyByIds(ids: string[]): Promise<Product[]> {
    const products = this.items.filter((item) =>
      ids.includes(item.id.toString()),
    );

    return products;
  }
}
