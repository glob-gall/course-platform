import { CreateUserUsecase } from '@/domain/user-system/application/use-cases/create-user.usecase';
import { UserRole } from '@/domain/user-system/entities/enums/roles.enum';
import { Public } from '@/infra/decorators/public.decorator';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { HttpError } from '../error/http.error';
import { UserAlreadyExistsError } from '@/domain/course-platform/application/use-cases/errors/user-already-exists.error';
interface CreateUserProps {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

@Controller('/user')
export class createUserController {
  constructor(private createUser: CreateUserUsecase) {}

  @Post()
  @Public()
  async siginIn(@Body() { name, email, password, role }: CreateUserProps) {
    const result = await this.createUser.exec({
      name,
      email,
      password,
      role: role ?? UserRole.Student,
    });

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new HttpError({
            code: HttpStatus.CONFLICT,
            message: 'Email já cadastrado.',
          });
    
        default:
          throw new HttpError({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Oops! um erro inesperado aconteceu, por favor entre em contato com a nossa equipe',
          });
      }
    }
  }
}
