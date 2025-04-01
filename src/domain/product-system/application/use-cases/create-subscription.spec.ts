import { makeSubscription } from '@/test/factories/make-subscription';
import { CreateSubscriptionUsecase } from './create-subscription.usecase';
import { InMemorySubscriptionsRepository } from '@/test/repositories/im-memory-subscriptions.repository';
import { InMemoryCoursesRepository } from '@/test/repositories/im-memory-courses.repository';

let subscriptionsRepository: InMemorySubscriptionsRepository;
let coursesRepository: InMemoryCoursesRepository;
let sut: CreateSubscriptionUsecase;

describe('Create Subscription Use Case', () => {
  beforeEach(() => {
    subscriptionsRepository = new InMemorySubscriptionsRepository();

    coursesRepository = new InMemoryCoursesRepository();
    sut = new CreateSubscriptionUsecase(
      subscriptionsRepository,
      coursesRepository,
    );
  });

  it('should be able to create a subscription', async () => {
    const subscription = makeSubscription();

    const response = await sut.exec({
      courses: [],
      cycle: subscription.cycle,
      PriceInCents: subscription.PriceInCents,
      title: subscription.title,
      description: subscription.description,
    });

    expect(response.isRight()).toBeTruthy();

    expect(subscriptionsRepository.items[0]).toEqual(
      expect.objectContaining({
        title: subscription.title,
        PriceInCents: subscription.PriceInCents,
      }),
    );
  });
});
