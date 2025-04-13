import { left, right } from '@/core/types/either';
import {
  AuthenticateUserUsecaseRequest,
  AuthenticateUserUsecaseResponse,
  IAuthenticateUserUsecase,
} from '@/domain/user-system/application/use-cases/authenticate-user.usecase';
import { WrongCredentialsError } from '@/domain/user-system/application/use-cases/errors/wrond-credentials.error';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FakeAuthenticateUserUsecase implements IAuthenticateUserUsecase {
  async exec({
    email,
  }: AuthenticateUserUsecaseRequest): Promise<AuthenticateUserUsecaseResponse> {
    if (!email.endsWith('.true')) return left(new WrongCredentialsError());

    return right({
      accessToken: 'fake-token',
      userId: 'fake-user-id',
    });
  }
}
