import { makePurchase } from '@/test/factories/make-purchase';
import { CreatePurchaseUsecase } from './create-purchase.usecase';
import { InMemoryPurchasesRepository } from '@/test/repositories/im-memory-purchases.repository';
import { InMemoryProductsRepository } from '@/test/repositories/im-memory-products.repository';
import { makeProduct } from '@/test/factories/make-product';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { InMemoryUsersRepository } from '@/test/repositories/im-memory-users.repository';
import { FakePaymentService } from '@/test/services/fake-payment-service';
import { makeUser } from '@/test/factories/make-user';

let purchasesRepository: InMemoryPurchasesRepository;
let productsRepository: InMemoryProductsRepository;
let usersRepository: InMemoryUsersRepository;
let fakePaymentService: FakePaymentService;
let sut: CreatePurchaseUsecase;

describe('Create Purchase Use Case', () => {
  beforeEach(() => {
    purchasesRepository = new InMemoryPurchasesRepository();
    productsRepository = new InMemoryProductsRepository();
    usersRepository = new InMemoryUsersRepository();
    fakePaymentService = new FakePaymentService();

    sut = new CreatePurchaseUsecase(
      purchasesRepository,
      productsRepository,
      usersRepository,
      fakePaymentService,
    );
  });

  it('should be able to create a purchase', async () => {
    const product = makeProduct();
    const user = makeUser();
    usersRepository.items.push(user);
    productsRepository.items.push(product);

    const response = await sut.exec({
      userCpf: '000.000.000-00',
      products: [product.id.toString()],
      type: 'PIX',
      userId: user.id.toString(),
    });

    expect(response.isRight()).toBeTruthy();

    expect(purchasesRepository.items[0]).toEqual(
      expect.objectContaining({
        totalPriceInCents: product.priceInCents,
        userId: user.id,
      }),
    );
  });
  it('should not be able to create a purchase with non existent products', async () => {
    const purchase = makePurchase();
    const product = makeProduct();
    const user = makeUser();
    usersRepository.items.push(user);

    const response = await sut.exec({
      products: [product.id.toString()],
      type: purchase.type,
      userId: user.id.toString(),
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(ResourceNotFoundError);

    expect(purchasesRepository.items).toHaveLength(0);
  });
});
