import { Injectable } from '@nestjs/common';
import { WrongCredentialsError } from './errors/wrond-credentials.error';

import { Either, left, right } from '@/core/types/either';
import { UsersRepository } from '../repositories/users.repository';
import { HashComparer } from '../cryptography/hash-comparer';
import { Encrypter } from '../cryptography/encrypter';

export interface AuthenticateUserUsecaseRequest {
  email: string;
  password: string;
}

export type AuthenticateUserUsecaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string;
    userId: string;
  }
>;
export abstract class IAuthenticateUserUsecase {
  abstract exec(
    params: AuthenticateUserUsecaseRequest,
  ): Promise<AuthenticateUserUsecaseResponse>;
}

@Injectable()
export class AuthenticateUserUsecase implements IAuthenticateUserUsecase {
  constructor(
    private userRepository: UsersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async exec({
    email,
    password,
  }: AuthenticateUserUsecaseRequest): Promise<AuthenticateUserUsecaseResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return left(new WrongCredentialsError());
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      return left(new WrongCredentialsError());
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
      user: {
        role: user.role,
        email: user.email,
        name: user.name,
      },
    });

    return right({ accessToken, userId: user.id.toString() });
  }
}
