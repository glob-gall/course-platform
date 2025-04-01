import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { PaymentType } from './enum/payment-type';
import { PaymentStatus } from './enum/payment_status';

export interface PurchaseProps {
  userId: UniqueEntityID;
  products: UniqueEntityID[];
  type: PaymentType;
  paymentstatus: PaymentStatus;
  totalpriceInCents: number;
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
  public get paymentstatus() {
    return this.props.paymentstatus;
  }
  public get type() {
    return this.props.type;
  }
  public get totalpriceInCents() {
    return this.props.totalpriceInCents;
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
