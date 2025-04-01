import { makeSubscription } from '@/test/factories/make-subscription';
import { EditSubscriptionUsecase } from './edit-subscription.usecase';
import { InMemorySubscriptionsRepository } from '@/test/repositories/im-memory-subscriptions.repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';

let subscriptionsRepository: InMemorySubscriptionsRepository;
let sut: EditSubscriptionUsecase;

describe('Edit Subscription Use Case', () => {
  beforeEach(() => {
    subscriptionsRepository = new InMemorySubscriptionsRepository();

    sut = new EditSubscriptionUsecase(subscriptionsRepository);
  });

  it('should be able to edit a subscription', async () => {
    const subscription = makeSubscription({
      PriceInCents: 200,
    });
    subscriptionsRepository.items.push(subscription);

    const response = await sut.exec({
      id: subscription.id.toString(),
      PriceInCents: 100,
      title: 'title-changed',
      cycle: 'MONTHLY',
    });

    expect(response.isRight()).toBeTruthy();

    expect(subscriptionsRepository.items[0]).toEqual(
      expect.objectContaining({
        title: 'title-changed',
        PriceInCents: 100,
      }),
    );
  });

  it('should not able to edit a subscription that do not exists', async () => {
    const response = await sut.exec({
      id: 'not-existenst-id',
      PriceInCents: 100,
      title: 'title-changed',
      cycle: 'BIWEEKLY',
    });

    expect(response.isLeft()).toBeTruthy();

    expect(response.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
