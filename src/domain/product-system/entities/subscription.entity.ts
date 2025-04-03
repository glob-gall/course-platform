import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { PaymentCycle } from './enum/payment_cycle';

export interface SubscriptionProps {
  courses: UniqueEntityID[];
  title: string;
  description?: string | null;
  cycle: PaymentCycle;
  priceInCents: number;

  createdAt: Date;
  updatedAt?: Date | null;
}

export class Subscription extends Entity<SubscriptionProps> {
  public get title() {
    return this.props.title;
  }
  public set title(title: string) {
    this.props.title = title;
  }

  public get description() {
    return this.props.description;
  }
  public set description(description: string | undefined | null) {
    this.props.description = description;
  }

  public get priceInCents() {
    return this.props.priceInCents;
  }
  public set priceInCents(priceInCents: number) {
    this.props.priceInCents = priceInCents;
  }

  public get cycle() {
    return this.props.cycle;
  }
  public set cycle(cycle: PaymentCycle) {
    this.props.cycle = cycle;
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
    props: Optional<SubscriptionProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): Subscription {
    const subscription = new Subscription(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return subscription;
  }
}
