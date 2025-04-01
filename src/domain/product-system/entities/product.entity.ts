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
  public get title() {
    return this.props.title;
  }
  public set title(title: string) {
    this.props.title = title;
  }
  public set description(description: string | undefined) {
    this.props.description = description;
  }
  public set PriceInCents(PriceInCents: number) {
    this.props.PriceInCents = PriceInCents;
  }
  public set courses(courses: UniqueEntityID[]) {
    this.props.courses = courses;
  }
  public set PromoPriceInCents(PromoPriceInCents: number | undefined) {
    this.props.PromoPriceInCents = PromoPriceInCents;
  }
  public set maxDatePromoPrice(maxDatePromoPrice: Date | undefined) {
    this.props.maxDatePromoPrice = maxDatePromoPrice;
  }

  public get description() {
    return this.props.description;
  }
  public get PriceInCents() {
    return this.props.PriceInCents;
  }
  public get PromoPriceInCents() {
    return this.props.PromoPriceInCents;
  }
  public get maxDatePromoPrice() {
    return this.props.maxDatePromoPrice;
  }
  public get courses() {
    return this.props.courses;
  }
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
