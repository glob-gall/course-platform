import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface ProductProps {
  title: string;
  description?: string;
  PriceInCents: number;
  PromoPriceInCents?: number;
  maxDatePromoPrice?: Date;

  courses: UniqueEntityID[];

  createdAt: Date;
  updatedAt?: Date | null;
}

export class Product extends Entity<ProductProps> {
  touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<ProductProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): Product {
    const product = new Product(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return product;
  }
}
