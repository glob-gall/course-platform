import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { HttpError } from '../error/http.error';
import { PaymentService } from '@/domain/product-system/payment-service/payment.service';
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { TokenPayload } from '@/infra/auth/guards/role.guard';
import { Response } from 'express';
import { UserRole } from '@/domain/user-system/entities/enums/roles.enum';
import { Roles } from '@/infra/decorators/roles.decorator';

@Controller('/me/payment-profile')
export class GetMyPaymentProfileController {
  constructor(private paymentService: PaymentService) {}

  @Get()
  @Roles(UserRole.Student, UserRole.CourseOwner, UserRole.Admin)
  async handle(
    @CurrentUser() user: TokenPayload,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const result = await this.paymentService.findPaymentProfile(user.sub);

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
