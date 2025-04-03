import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface ProductProps {
  title: string;
  description?: string;
  priceInCents: number;
  promoPriceInCents?: number | null;
  maxDatePromoPrice?: Date | null;

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
  public set priceInCents(priceInCents: number) {
    this.props.priceInCents = priceInCents;
  }
  public set courses(courses: UniqueEntityID[]) {
    this.props.courses = courses;
  }
  public set promoPriceInCents(PromoPriceInCents: number | undefined | null) {
    this.props.promoPriceInCents = PromoPriceInCents;
  }
  public set maxDatePromoPrice(maxDatePromoPrice: Date | undefined | null) {
    this.props.maxDatePromoPrice = maxDatePromoPrice;
  }

  public get description() {
    return this.props.description;
  }
  public get priceInCents() {
    return this.props.priceInCents;
  }
  public get promoPriceInCents() {
    return this.props.promoPriceInCents;
  }
  public get maxDatePromoPrice() {
    return this.props.maxDatePromoPrice;
  }
  public get courses() {
    return this.props.courses;
  }
  public get createdAt() {
    return this.props.createdAt;
  }
  public get updatedAt() {
    return this.props.updatedAt;
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
