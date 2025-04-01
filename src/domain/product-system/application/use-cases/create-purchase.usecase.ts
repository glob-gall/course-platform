import { Either, left, right } from '@/core/types/either';
import { Purchase } from '../../entities/purchase.entity';
import { PurchasesRepository } from '../repositories/purchases.repository';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { ProductsRepository } from '../repositories/products.repository';
import { PaymentType } from '../../entities/enum/payment-type';
import { PaymentStatus } from '../../entities/enum/payment_status';

interface CreatePurchaseRequest {
  paymentstatus: PaymentStatus;
  products: string[];
  totalpriceInCents: number;
  type: PaymentType;
  userId: string;
}

type CreatePurchaseResponse = Either<
  ResourceNotFoundError,
  { purchase: Purchase }
>;

export class CreatePurchaseUsecase {
  constructor(
    private purchasesRepository: PurchasesRepository,
    private productsRepository: ProductsRepository,
  ) {}

  async exec({
    paymentstatus,
    products,
    totalpriceInCents,
    type,
    userId,
  }: CreatePurchaseRequest): Promise<CreatePurchaseResponse> {
    const findedProducts =
      await this.productsRepository.findManyByIds(products);
    if (products.length !== findedProducts.length)
      return left(new ResourceNotFoundError());

    const purchase = Purchase.create({
      paymentstatus,
      products: products.map((productId) => new UniqueEntityID(productId)),
      totalpriceInCents,
      type,
      userId: new UniqueEntityID(userId),
    });

    await this.purchasesRepository.create(purchase);
    return right({ purchase });
  }
}
