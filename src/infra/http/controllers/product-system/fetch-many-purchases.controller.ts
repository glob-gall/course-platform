import { Controller, Get, HttpStatus } from '@nestjs/common';
import { HttpError } from '../error/http.error';
import { FetchManyPurchasesUsecase } from '@/domain/product-system/application/use-cases/fetch-many-purchases.usecase';
import { PurchasePresenter } from '../../presenters/purchase.presenter';

@Controller('/purchase')
export class fetchManyPurchasesController {
  constructor(private fetchmanyPurchase: FetchManyPurchasesUsecase) {}

  @Get()
  async get() {
    const result = await this.fetchmanyPurchase.exec();

    if (result.isLeft()) {
      throw new HttpError({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          'Oops! um erro inesperado aconteceu, por favor entre em contato com a nossa equipe',
      });
    }

    return {
      purchases: result.value.purchases.map(PurchasePresenter.toHTTP),
    };
  }
}
