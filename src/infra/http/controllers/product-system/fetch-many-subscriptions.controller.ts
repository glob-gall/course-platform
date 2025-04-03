import { Controller, Get, HttpStatus } from '@nestjs/common';
import { HttpError } from '../error/http.error';
import { FetchManySubscriptionsUsecase } from '@/domain/product-system/application/use-cases/fetch-many-subscriptions.usecase';

@Controller('/subscription')
export class fetchManySubscriptionsController {
  constructor(private fetchmanySubscription: FetchManySubscriptionsUsecase) {}

  @Get()
  async get() {
    const result = await this.fetchmanySubscription.exec();

    if (result.isLeft()) {
      throw new HttpError({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          'Oops! um erro inesperado aconteceu, por favor entre em contato com a nossa equipe',
      });
    }
  }
}
