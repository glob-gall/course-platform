import { Controller, Get, HttpStatus } from '@nestjs/common';
import { HttpError } from '../error/http.error';
import { FetchManyProductsUsecase } from '@/domain/product-system/application/use-cases/fetch-many-products.usecase';
import { Roles } from '@/infra/decorators/roles.decorator';
import { UserRole } from '@/domain/user-system/entities/enums/roles.enum';
import { ProductPresenter } from '../../presenters/product.presenter';

@Controller('/product')
export class fetchManyProductsController {
  constructor(private fetchmanyProduct: FetchManyProductsUsecase) {}

  @Get()
  @Roles(UserRole.Student, UserRole.CourseOwner, UserRole.Admin)
  async get() {
    const result = await this.fetchmanyProduct.exec();

    if (result.isLeft()) {
      throw new HttpError({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          'Oops! um erro inesperado aconteceu, por favor entre em contato com a nossa equipe',
      });
    }
    return {
      products: result.value.products.map(ProductPresenter.toHTTP),
    };
  }
}
