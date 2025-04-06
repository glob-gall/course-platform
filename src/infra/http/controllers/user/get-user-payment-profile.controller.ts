import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { HttpError } from '../error/http.error';
import { PaymentService } from '@/domain/product-system/payment-service/payment.service';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { Roles } from '@/infra/decorators/roles.decorator';
import { UserRole } from '@/domain/user-system/entities/enums/roles.enum';

@Controller('/user/:userId/payment-profile')
export class GetUserPaymentProfileController {
  constructor(private paymentService: PaymentService) {}

  @Get()
  @Roles(UserRole.Admin, UserRole.CourseOwner)
  async siginIn(@Param('userId') userId: string) {
    try {
      const result = await this.paymentService.findPaymentProfile(userId);
      return result;
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        throw new HttpError({
          code: HttpStatus.NOT_FOUND,
          message: error.message,
        });
      }
      throw new HttpError({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          'Oops! um erro inesperado aconteceu, por favor entre em contato com a nossa equipe',
      });
    }
  }
}
