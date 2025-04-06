import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { HttpError } from '../error/http.error';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { CreatePurchaseUsecase } from '@/domain/product-system/application/use-cases/create-purchase.usecase';
import { Roles } from '@/infra/decorators/roles.decorator';
import { UserRole } from '@/domain/user-system/entities/enums/roles.enum';

const createPurchaseBodySchema = z.object({
  products: z.array(z.string()),
  type: z.enum(['BOLETO', 'CREDIT_CARD', 'PIX', 'UNDEFINED']),
  userId: z.string(),
});
type CreatePurchaseBodySchema = z.infer<typeof createPurchaseBodySchema>;
const createPurchaseValidationPipe = new ZodValidationPipe(
  createPurchaseBodySchema,
);

@Controller('/purchase')
export class createPurchaseController {
  constructor(private createPurchase: CreatePurchaseUsecase) {}

  @Post()
  @Roles(UserRole.CourseOwner, UserRole.Admin)
  async post(
    @Body(createPurchaseValidationPipe)
    { products, type, userId }: CreatePurchaseBodySchema,
  ) {
    const result = await this.createPurchase.exec({
      products,
      type,
      userId,
    });

    if (result.isLeft()) {
      throw new HttpError({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          'Oops! um erro inesperado aconteceu, por favor entre em contato com a nossa equipe',
      });
    }
  }
}
