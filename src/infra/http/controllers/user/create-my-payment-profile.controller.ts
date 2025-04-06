import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { HttpError } from '../error/http.error';
import { PaymentService } from '@/domain/product-system/payment-service/payment.service';
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { TokenPayload } from '@/infra/auth/guards/role.guard';
import { Response } from 'express';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { Roles } from '@/infra/decorators/roles.decorator';
import { UserRole } from '@/domain/user-system/entities/enums/roles.enum';

const createPaymentProfileBodySchema = z.object({
  cpf: z.string(),
});
type CreatePaymentProfileBodySchema = z.infer<
  typeof createPaymentProfileBodySchema
>;
const createPaymentProfileValidationPipe = new ZodValidationPipe(
  createPaymentProfileBodySchema,
);

@Controller('/me/payment-profile')
export class CreateMyPaymentProfileController {
  constructor(private paymentService: PaymentService) {}

  @Post()
  @Roles(UserRole.Student, UserRole.CourseOwner, UserRole.Admin)
  async handle(
    @CurrentUser() payload: TokenPayload,
    @Body(createPaymentProfileValidationPipe)
    body: CreatePaymentProfileBodySchema,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const result = await this.paymentService.createPaymentProfile({
        cpf: body.cpf,
        email: payload.user.email,
      });
      if (result.isLeft()) {
        res.statusCode = HttpStatus.NOT_FOUND;
        return;
      }

      res.cookie('payment-profile', result.value.profileToken, {
        httpOnly: true,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpError({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          'Oops! um erro inesperado aconteceu, por favor entre em contato com a nossa equipe',
      });
    }
  }
}
