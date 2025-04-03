import { Either, left, right } from '@/core/types/either';
import { Subscription } from '../../entities/subscription.entity';
import { SubscriptionsRepository } from '../repositories/subscriptions.repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { PaymentCycle } from '../../entities/enum/payment_cycle';

interface EditSubscriptionRequest {
  id: string;
  title: string;
  description?: string;
  cycle: PaymentCycle;
  priceInCents: number;
}

type EditSubscriptionResponse = Either<
  ResourceNotFoundError,
  { subscription: Subscription }
>;

export class EditSubscriptionUsecase {
  constructor(private subscriptionsRepository: SubscriptionsRepository) {}

  async exec({
    id,
    priceInCents,
    cycle,
    title,
    description,
  }: EditSubscriptionRequest): Promise<EditSubscriptionResponse> {
    const subscription = await this.subscriptionsRepository.findById(id);
    if (!subscription) return left(new ResourceNotFoundError());

    subscription.title = title;
    subscription.description = description;
    subscription.cycle = cycle;
    subscription.priceInCents = priceInCents;

    await this.subscriptionsRepository.save(subscription);
    return right({ subscription });
  }
}
