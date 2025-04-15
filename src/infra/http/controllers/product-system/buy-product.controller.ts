import { Body, Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { HttpError } from '../error/http.error';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { CreatePurchaseUsecase } from '@/domain/product-system/application/use-cases/create-purchase.usecase';
import { Roles } from '@/infra/decorators/roles.decorator';
import { UserRole } from '@/domain/user-system/entities/enums/roles.enum';
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { TokenPayload } from '@/infra/auth/guards/role.guard';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { PaymentSystemInternalError } from '@/domain/product-system/payment-service/error/payment-system-internal.error';
import { NoPaymentProfileError } from '@/domain/product-system/payment-service/error/no-payment-profile.error';
import { PurchasePresenter } from '../../presenters/purchase.presenter';

const createPurchaseBodySchema = z.object({
  type: z.enum(['BOLETO', 'CREDIT_CARD', 'PIX', 'UNDEFINED']),
});
type CreatePurchaseBodySchema = z.infer<typeof createPurchaseBodySchema>;
const createPurchaseValidationPipe = new ZodValidationPipe(
  createPurchaseBodySchema,
);

@Controller('/purchase/:purchaseId')
export class BuyProductController {
  constructor(private createPurchase: CreatePurchaseUsecase) {}

  @Post()
  @Roles(UserRole.CourseOwner, UserRole.Admin, UserRole.Student)
  async post(
    @CurrentUser() user: TokenPayload,
    @Param('purchaseId') purchaseId: string,
    @Body(createPurchaseValidationPipe)
    { type }: CreatePurchaseBodySchema,
  ) {
    const result = await this.createPurchase.exec({
      products: [purchaseId],
      type,
      userId: user.sub,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new HttpError({
            code: HttpStatus.CONFLICT,
            message: 'item não encontrado.',
          });
        case NoPaymentProfileError:
          throw new HttpError({
            code: HttpStatus.NOT_ACCEPTABLE,
            message: 'necessário perfil de pagamento.',
          });
        case PaymentSystemInternalError:
          throw new HttpError({
            code: HttpStatus.BAD_GATEWAY,
            message: 'Erro no sistema de pagamento.',
          });

        default:
          throw new HttpError({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message:
              'Oops! um erro inesperado aconteceu, por favor entre em contato com a nossa equipe',
          });
      }
    }
    return { purchase: PurchasePresenter.toHTTP(result.value.purchase) };
  }
}
