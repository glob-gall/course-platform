import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface PurchaseProps {
  userId: UniqueEntityID;
  products: UniqueEntityID[];

  createdAt: Date;
  updatedAt?: Date | null;
}

export class Purchase extends Entity<PurchaseProps> {
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
