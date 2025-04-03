import { Controller, Get, HttpStatus } from '@nestjs/common';
import { HttpError } from '../error/http.error';
import { FetchManyProductsUsecase } from '@/domain/product-system/application/use-cases/fetch-many-products.usecase';

@Controller('/product')
export class fetchmanyProductController {
  constructor(private fetchmanyProduct: FetchManyProductsUsecase) {}

  @Get()
  async get() {
    const result = await this.fetchmanyProduct.exec();

    if (result.isLeft()) {
      throw new HttpError({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          'Oops! um erro inesperado aconteceu, por favor entre em contato com a nossa equipe',
      });
    }
  }
}
