import { makeSubscription } from '@/test/factories/make-subscription';
import { InMemorySubscriptionsRepository } from '@/test/repositories/im-memory-subscriptions.repository';
import { FetchManySubscriptionsUsecase } from './fetch-many-subscriptions.usecase';

let subscriptionsRepository: InMemorySubscriptionsRepository;
let sut: FetchManySubscriptionsUsecase;

describe('Fetch Many Subscriptions Use Case', () => {
  beforeEach(() => {
    subscriptionsRepository = new InMemorySubscriptionsRepository();

    sut = new FetchManySubscriptionsUsecase(subscriptionsRepository);
  });

  it('should be able to fetch many subscriptions', async () => {
    const subscription1 = makeSubscription();
    const subscription2 = makeSubscription();
    subscriptionsRepository.items.push(subscription1, subscription2);

    const response = await sut.exec();

    expect(response.isRight()).toBeTruthy();

    expect(response.value).toEqual({
      subscriptions: expect.arrayContaining([subscription1, subscription2]),
    });
  });
});
