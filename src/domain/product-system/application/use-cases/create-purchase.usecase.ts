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
import { Injectable } from '@nestjs/common';
import { PaymentSystemInternalError } from '../../payment-service/error/payment-system-internal.error';
import { NoPaymentProfileError } from '../../payment-service/error/no-payment-profile.error';

interface CreatePurchaseRequest {
  products: string[];
  type: PaymentType;
  userId: string;
}

type CreatePurchaseResponse = Either<
  ResourceNotFoundError | PaymentSystemInternalError | NoPaymentProfileError,
  { purchase: Purchase }
>;

@Injectable()
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

    const paymentSystemResponse = await this.paymentService.createCharge({
      userId,
      paymentType: type,
      value: totalPriceInCents / 100,
    });
    if (paymentSystemResponse.isLeft()) {
      const error = paymentSystemResponse.value;
      switch (error.constructor) {
        case NoPaymentProfileError:
          return left(new NoPaymentProfileError());

        default:
          return left(new PaymentSystemInternalError());
      }
    }

    const { paymentSystemId, chargeUrl } = paymentSystemResponse.value;

    const purchase = Purchase.create({
      paymentStatus: 'PENDING',
      products: findedProducts,
      chargeUrl,
      externalId: paymentSystemId,
      totalPriceInCents,
      type,
      userId: new UniqueEntityID(userId),
    });

    await this.purchasesRepository.create(purchase);

    return right({ purchase });
  }
}
