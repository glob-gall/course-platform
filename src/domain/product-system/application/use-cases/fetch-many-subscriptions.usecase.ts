import { Either, right } from '@/core/types/either';
import { Subscription } from '../../entities/subscription.entity';
import { SubscriptionsRepository } from '../repositories/subscriptions.repository';
import { Injectable } from '@nestjs/common';

type FetchManySubscriptionsResponse = Either<
  null,
  { subscriptions: Subscription[] }
>;

@Injectable()
export class FetchManySubscriptionsUsecase {
  constructor(private subscriptionsRepository: SubscriptionsRepository) {}

  async exec(): Promise<FetchManySubscriptionsResponse> {
    const subscriptions = await this.subscriptionsRepository.findMany();
    return right({ subscriptions });
  }
}
