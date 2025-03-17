import { Module } from '@nestjs/common';

// import { UsersRepository } from '@/domain/user-system/application/repositories/users.repository';
import { createUserController } from './controllers/user/create-user..controller';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { DatabaseModule } from '../database/database.module';
import { CreateUserUsecase } from '@/domain/user-system/application/use-cases/create-user.usecase';
import { AuthenticateUserUsecase } from '@/domain/user-system/application/use-cases/authenticate-user.usecase';
import { SignInController } from '../http/controllers/auth/sign-in.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, CryptographyModule, AuthModule],
  providers: [CreateUserUsecase, AuthenticateUserUsecase],
  controllers: [createUserController, SignInController],
})
export class HttpModule {}
