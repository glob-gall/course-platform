import { Either, left, right } from '@/core/types/either';
import { Purchase } from '../../entities/purchase.entity';
import { PurchasesRepository } from '../repositories/purchases.repository';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { ProductsRepository } from '../repositories/products.repository';
import { PaymentType } from '../../entities/enum/payment-type';
import { UsersRepository } from '@/domain/user-system/application/repositories/users.repository';
import { sumProductPrices } from '../utils/sum-product-prices';
import { PaymentService } from '../../payment-service/payment.service';

interface CreatePurchaseRequest {
  products: string[];
  type: PaymentType;
  userId: string;
  userCpf?: string;
}

type CreatePurchaseResponse = Either<
  ResourceNotFoundError,
  { purchase: Purchase }
>;

export class CreatePurchaseUsecase {
  constructor(
    private purchasesRepository: PurchasesRepository,
    private productsRepository: ProductsRepository,
    private usersRepository: UsersRepository,
    private paymentService: PaymentService,
  ) {}

  async exec({
    products,
    type,
    userId,
  }: CreatePurchaseRequest): Promise<CreatePurchaseResponse> {
    const today = new Date();
    const findedUser = await this.usersRepository.findById(userId);
    if (!findedUser) return left(new ResourceNotFoundError());

    const findedProducts =
      await this.productsRepository.findManyByIds(products);
    if (products.length !== findedProducts.length)
      return left(new ResourceNotFoundError());

    const totalPriceInCents = sumProductPrices(findedProducts, today);

    const purchase = Purchase.create({
      paymentStatus: 'PENDING',
      products: products.map((productId) => new UniqueEntityID(productId)),
      totalPriceInCents,
      type,
      userId: new UniqueEntityID(userId),
    });

    await this.purchasesRepository.create(purchase);

    await this.paymentService.createCharge({
      userId,
      paymentType: type,
      value: totalPriceInCents / 100,
    });

    return right({ purchase });
  }
}
