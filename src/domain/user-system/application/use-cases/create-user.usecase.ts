import { Either, left, right } from '@/core/types/either';
import { User } from '../../entities/user.entity';
import { UsersRepository } from '../repositories/users.repository';
import { UserRole } from '../../entities/enums/roles.enum';
import { Injectable } from '@nestjs/common';
import { HashGenerator } from '../cryptography/hash-generator';
import { UserAlreadyExistsError } from '@/domain/course-platform/application/use-cases/errors/user-already-exists.error';

export interface CreateUserUsecaseRequest {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

type CreateUserResponse = Either<UserAlreadyExistsError, { user: User }>;

@Injectable()
export class CreateUserUsecase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async exec({
    email,
    name,
    password,
    role,
  }: CreateUserUsecaseRequest): Promise<CreateUserResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) return left(new UserAlreadyExistsError());

    const hashedPassword = await this.hashGenerator.hash(password);
    const user = User.create({
      name,
      email,
      password: hashedPassword,
      purchases: [],
      userCourse: [],
      role: role ?? UserRole.Student,
    });

    await this.usersRepository.create(user);

    return right({ user });
  }
}
