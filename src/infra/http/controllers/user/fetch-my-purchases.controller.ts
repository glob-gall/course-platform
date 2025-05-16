import { Controller, Get, HttpStatus } from '@nestjs/common';
import { HttpError } from '../error/http.error';
import { Roles } from '@/infra/decorators/roles.decorator';
import { UserRole } from '@/domain/user-system/entities/enums/roles.enum';
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { TokenPayload } from '@/infra/auth/guards/role.guard';
import { FetchPurchasesByUserUsecase } from '@/domain/product-system/application/use-cases/fetch-purchases-by-user.usecase';
import { PurchasePresenter } from '../../presenters/purchase.presenter';

@Controller('/me/purchases')
export class FetchMyPurchasesController {
  constructor(private fetchpurchasesByUser: FetchPurchasesByUserUsecase) {}

  @Get()
  @Roles(UserRole.Admin, UserRole.CourseOwner)
  async execute(@CurrentUser() user: TokenPayload) {
    const result = await this.fetchpurchasesByUser.exec(user.sub);
    if (result.isLeft()) {
      throw new HttpError({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          'Oops! um erro inesperado aconteceu, por favor entre em contato com a nossa equipe',
      });
    }

    return { purchases: result.value.purchases.map(PurchasePresenter.toHTTP) };
  }
}
