import { makeSubscription } from '@/test/factories/make-subscription';
import { InMemorySubscriptionsRepository } from '@/test/repositories/im-memory-subscriptions.repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { DeleteSubscriptionUsecase } from './delete-subscription.usecase';

let subscriptionsRepository: InMemorySubscriptionsRepository;
let sut: DeleteSubscriptionUsecase;

describe('Delete Subscription Use Case', () => {
  beforeEach(() => {
    subscriptionsRepository = new InMemorySubscriptionsRepository();

    sut = new DeleteSubscriptionUsecase(subscriptionsRepository);
  });

  it('should be able to delete a Subscription', async () => {
    const subscription = makeSubscription();
    subscriptionsRepository.items.push(subscription);

    const response = await sut.exec({
      id: subscription.id.toString(),
    });

    expect(response.isRight()).toBeTruthy();

    expect(subscriptionsRepository.items).toHaveLength(0);
  });

  it('should not able to delete a subscription that do not exists', async () => {
    const response = await sut.exec({
      id: 'not-existenst-id',
    });

    expect(response.isLeft()).toBeTruthy();

    expect(response.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
