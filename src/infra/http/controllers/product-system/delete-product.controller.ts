import { Controller, Delete, HttpStatus, Param } from '@nestjs/common';
import { HttpError } from '../error/http.error';
import { DeleteProductUsecase } from '@/domain/product-system/application/use-cases/delete-product.usecase';
import { Roles } from '@/infra/decorators/roles.decorator';
import { UserRole } from '@/domain/user-system/entities/enums/roles.enum';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';

@Controller('/product/:productId')
export class deleteProductController {
  constructor(private deleteProduct: DeleteProductUsecase) {}

  @Delete()
  @Roles(UserRole.CourseOwner, UserRole.Admin)
  async post(@Param('productId') productId: string) {
    const result = await this.deleteProduct.exec({
      id: productId,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new HttpError({
            code: HttpStatus.CONFLICT,
            message: 'Produto não encontrado.',
          });

        default:
          throw new HttpError({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message:
              'Oops! um erro inesperado aconteceu, por favor entre em contato com a nossa equipe',
          });
      }
    }
  }
}
