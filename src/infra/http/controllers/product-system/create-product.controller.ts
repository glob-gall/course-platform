import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { HttpError } from '../error/http.error';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { CreateProductUsecase } from '@/domain/product-system/application/use-cases/create-product.usecase';
import { Roles } from '@/infra/decorators/roles.decorator';
import { UserRole } from '@/domain/user-system/entities/enums/roles.enum';

const createProductBodySchema = z.object({
  description: z.string().optional(),
  title: z.string().min(8),
  courses: z.array(z.string()),
  priceInCents: z.coerce.number().int(),
  maxDatePromoPrice: z.coerce.date(),
  promoPriceInCents: z.coerce.number().int(),
});
type CreateProductBodySchema = z.infer<typeof createProductBodySchema>;
const createProductValidationPipe = new ZodValidationPipe(
  createProductBodySchema,
);

@Controller('/product')
export class createProductController {
  constructor(private createProduct: CreateProductUsecase) {}

  @Post()
  @Roles(UserRole.CourseOwner, UserRole.Admin)
  async post(
    @Body(createProductValidationPipe)
    {
      courses,
      priceInCents,
      title,
      description,
      maxDatePromoPrice,
      promoPriceInCents,
    }: CreateProductBodySchema,
  ) {
    const result = await this.createProduct.exec({
      courses,
      priceInCents,
      title,
      description,
      maxDatePromoPrice: new Date(maxDatePromoPrice),
      promoPriceInCents,
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
