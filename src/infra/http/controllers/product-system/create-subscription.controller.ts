import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { HttpError } from '../error/http.error';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { CreateSubscriptionUsecase } from '@/domain/product-system/application/use-cases/create-subscription.usecase';
import { Roles } from '@/infra/decorators/roles.decorator';
import { UserRole } from '@/domain/user-system/entities/enums/roles.enum';

const createSubscriptionBodySchema = z.object({
  courses: z.array(z.string()),
  cycle: z.enum([
    'WEEKLY',
    'BIWEEKLY',
    'MONTHLY',
    'QUARTERLY',
    'SEMIANNUALLY',
    'YEARLY',
  ]),
  priceInCents: z.coerce.number(),
  title: z.string(),
  description: z.string().optional(),
});
type CreateSubscriptionBodySchema = z.infer<
  typeof createSubscriptionBodySchema
>;
const createSubscriptionValidationPipe = new ZodValidationPipe(
  createSubscriptionBodySchema,
);

@Controller('/subscription')
export class createSubscriptionController {
  constructor(private createSubscription: CreateSubscriptionUsecase) {}

  @Post()
  @Roles(UserRole.CourseOwner, UserRole.Admin)
  async post(
    @Body(createSubscriptionValidationPipe)
    {
      courses,
      cycle,
      priceInCents,
      title,
      description,
    }: CreateSubscriptionBodySchema,
  ) {
    const result = await this.createSubscription.exec({
      courses,
      cycle,
      priceInCents,
      title,
      description,
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
