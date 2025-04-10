import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { HttpError } from '../error/http.error';
import { Roles } from '@/infra/decorators/roles.decorator';
import { UserRole } from '@/domain/user-system/entities/enums/roles.enum';
import { ProductDetailsPresenter } from '../../presenters/product-details.presenter';
import { GetProductDetailsUsecase } from '@/domain/product-system/application/use-cases/get-product-details.usecase';

@Controller('/product/:productId')
export class getProductDetailsController {
  constructor(private getProductDetails: GetProductDetailsUsecase) {}

  @Get()
  @Roles(UserRole.Student, UserRole.CourseOwner, UserRole.Admin)
  async get(@Param('productId') productId: string) {
    const result = await this.getProductDetails.exec(productId);

    if (result.isLeft()) {
      throw new HttpError({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          'Oops! um erro inesperado aconteceu, por favor entre em contato com a nossa equipe',
      });
    }
    return {
      product: ProductDetailsPresenter.toHTTP(result.value.product),
    };
  }
}
