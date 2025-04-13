import { IAuthenticateUserUsecase } from '@/domain/user-system/application/use-cases/authenticate-user.usecase';
import { Public } from '@/infra/decorators/public.decorator';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { HttpError } from '../error/http.error';
import { WrongCredentialsError } from '@/domain/user-system/application/use-cases/errors/wrond-credentials.error';
import { PaymentService } from '@/domain/product-system/payment-service/payment.service';
import { z } from 'zod';
import { ValidationPipe } from '@/infra/validation/validation.pipe';

const authTestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
type AuthTestSchema = z.infer<typeof authTestSchema>;

@Controller('/auth/sign-in')
export class SignInController {
  constructor(
    private authenticateUser: IAuthenticateUserUsecase,
    private paymentService: PaymentService,
  ) {}

  @Post()
  @Public()
  @HttpCode(200)
  async siginIn(
    @Body(new ValidationPipe(authTestSchema))
    { email, password }: AuthTestSchema,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authenticateUser.exec({ email, password });
    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case WrongCredentialsError:
          throw new HttpError({
            code: HttpStatus.UNAUTHORIZED,
            message: 'Credenciais inválidas.',
          });

        default:
          throw new HttpError({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message:
              'Oops! um erro inesperado aconteceu, por favor entre em contato com a nossa equipe',
          });
      }
    }
    const profileResult = await this.paymentService.findPaymentProfile(
      result.value.userId,
    );

    if (profileResult.isRight()) {
      const { profileToken } = profileResult.value;

      res.cookie('payment-profile', profileToken, {
        httpOnly: true,
      });
    }

    res.cookie('user-token', result.value.accessToken, { httpOnly: true });
  }
}
