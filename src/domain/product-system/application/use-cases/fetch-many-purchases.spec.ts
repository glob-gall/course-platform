import { makePurchase } from '@/test/factories/make-purchase';
import { InMemoryPurchasesRepository } from '@/test/repositories/im-memory-purchases.repository';
import { FetchManyPurchasesUsecase } from './fetch-many-purchases.usecase';

let purchasesRepository: InMemoryPurchasesRepository;
let sut: FetchManyPurchasesUsecase;

describe('Fetch Many Purchases Use Case', () => {
  beforeEach(() => {
    purchasesRepository = new InMemoryPurchasesRepository();

    sut = new FetchManyPurchasesUsecase(purchasesRepository);
  });

  it('should be able to fetch many purchases', async () => {
    const purchase1 = makePurchase();
    const purchase2 = makePurchase();
    purchasesRepository.items.push(purchase1, purchase2);

    const response = await sut.exec();

    expect(response.isRight()).toBeTruthy();

    expect(response.value).toEqual({
      purchases: expect.arrayContaining([purchase1, purchase2]),
    });
  });
});
