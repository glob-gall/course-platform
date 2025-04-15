import { makePurchase } from '@/test/factories/make-purchase';
import { InMemoryPurchasesRepository } from '@/test/repositories/im-memory-purchases.repository';
import { makeUser } from '@/test/factories/make-user';
import { FetchPurchasesByUserUsecase } from './fetch-purchases-by-user.usecase';

let purchasesRepository: InMemoryPurchasesRepository;
let sut: FetchPurchasesByUserUsecase;

describe('Fetch Many Purchases Use Case', () => {
  beforeEach(() => {
    purchasesRepository = new InMemoryPurchasesRepository();

    sut = new FetchPurchasesByUserUsecase(purchasesRepository);
  });

  it('should be able to fetch many purchases', async () => {
    const user = makeUser();
    const purchase1 = makePurchase({
      userId: user,
    });
    const purchase2 = makePurchase({
      userId: user,
    });
    const purchase3 = makePurchase();
    purchasesRepository.items.push(purchase1, purchase2, purchase3);

    const response = await sut.exec(user.id.toString());

    expect(response.isRight()).toBeTruthy();

    expect(response.value?.purchases).toHaveLength(2);
    expect(response.value).toEqual({
      purchases: expect.arrayContaining([purchase1, purchase2]),
    });
  });
});
