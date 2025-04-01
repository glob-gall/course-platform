import { makePurchase } from '@/test/factories/make-purchase';
import { CreatePurchaseUsecase } from './create-purchase.usecase';
import { InMemoryPurchasesRepository } from '@/test/repositories/im-memory-purchases.repository';
import { InMemoryProductsRepository } from '@/test/repositories/im-memory-products.repository';
import { makeProduct } from '@/test/factories/make-product';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';

let purchasesRepository: InMemoryPurchasesRepository;
let productsRepository: InMemoryProductsRepository;
let sut: CreatePurchaseUsecase;

describe('Create Purchase Use Case', () => {
  beforeEach(() => {
    purchasesRepository = new InMemoryPurchasesRepository();

    productsRepository = new InMemoryProductsRepository();
    sut = new CreatePurchaseUsecase(purchasesRepository, productsRepository);
  });

  it('should be able to create a purchase', async () => {
    const purchase = makePurchase();
    const product = makeProduct();
    productsRepository.items.push(product);

    const response = await sut.exec({
      paymentstatus: purchase.paymentstatus,
      products: [product.id.toString()],
      totalpriceInCents: purchase.totalpriceInCents,
      type: purchase.type,
      userId: 'user-01',
    });

    expect(response.isRight()).toBeTruthy();

    expect(purchasesRepository.items[0]).toEqual(
      expect.objectContaining({
        totalpriceInCents: purchase.totalpriceInCents,
        userId: new UniqueEntityID('user-01'),
      }),
    );
  });
  it('should not be able to create a purchase with non existent products', async () => {
    const purchase = makePurchase();
    const product = makeProduct();

    const response = await sut.exec({
      paymentstatus: purchase.paymentstatus,
      products: [product.id.toString()],
      totalpriceInCents: purchase.totalpriceInCents,
      type: purchase.type,
      userId: 'user-01',
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(ResourceNotFoundError);

    expect(purchasesRepository.items).toHaveLength(0);
  });
});
