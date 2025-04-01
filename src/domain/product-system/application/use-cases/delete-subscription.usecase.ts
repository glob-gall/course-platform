import { Either, left, right } from '@/core/types/either';
import { Subscription } from '../../entities/subscription.entity';
import { SubscriptionsRepository } from '../repositories/subscriptions.repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';

interface DeleteSubscriptionRequest {
  id: string;
}

type DeleteSubscriptionResponse = Either<
  ResourceNotFoundError,
  { subscription: Subscription }
>;

export class DeleteSubscriptionUsecase {
  constructor(private subscriptionsRepository: SubscriptionsRepository) {}

  async exec({
    id,
  }: DeleteSubscriptionRequest): Promise<DeleteSubscriptionResponse> {
    const subscription = await this.subscriptionsRepository.findById(id);
    if (!subscription) return left(new ResourceNotFoundError());

    await this.subscriptionsRepository.delete(id);
    return right({ subscription });
  }
}
