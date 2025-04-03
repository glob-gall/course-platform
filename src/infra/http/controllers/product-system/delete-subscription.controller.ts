import { Controller, Delete, HttpStatus, Param } from '@nestjs/common';
import { HttpError } from '../error/http.error';
import { DeleteSubscriptionUsecase } from '@/domain/product-system/application/use-cases/delete-subscription.usecase';
import { Roles } from '@/infra/decorators/roles.decorator';
import { UserRole } from '@/domain/user-system/entities/enums/roles.enum';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';

@Controller('/subscription/:subscriptionId')
export class deleteSubscriptionController {
  constructor(private deleteSubscription: DeleteSubscriptionUsecase) {}

  @Delete()
  @Roles(UserRole.CourseOwner, UserRole.Admin)
  async post(@Param('subscriptionId') subscriptionId: string) {
    const result = await this.deleteSubscription.exec({
      id: subscriptionId,
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
