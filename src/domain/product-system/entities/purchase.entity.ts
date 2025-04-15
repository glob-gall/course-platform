import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { PaymentType } from './enum/payment-type';
import { PaymentStatus } from './enum/payment_status';
import { Product } from './product.entity';
import { User } from '@/domain/user-system/entities/user.entity';

export interface PurchaseProps {
  userId: UniqueEntityID | User;
  products: Product[];
  type: PaymentType;
  paymentStatus: PaymentStatus;
  totalPriceInCents: number;

  chargeUrl: string;
  externalId: string;

  createdAt: Date;
  updatedAt?: Date | null;
}

export class Purchase extends Entity<PurchaseProps> {
  public get userId() {
    return this.props.userId;
  }
  public get products() {
    return this.props.products;
  }
  public get paymentStatus() {
    return this.props.paymentStatus;
  }

  public get type() {
    return this.props.type;
  }
  public get chargeUrl() {
    return this.props.chargeUrl;
  }
  public get externalId() {
    return this.props.externalId;
  }
  public get totalPriceInCents() {
    return this.props.totalPriceInCents;
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
    props: Optional<PurchaseProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): Purchase {
    const purchase = new Purchase(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return purchase;
  }
}
