import { Either, left, right } from '@/core/types/either';
import { User } from '../../entities/user.entity';
import { UsersRepository } from '../repositories/users.repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';

interface EditUserUsecaseRequest {
  id: string;
  name: string;
}

type EditUserResponse = Either<ResourceNotFoundError, { user: User }>;

export class EditUserUsecase {
  constructor(private usersRepository: UsersRepository) {}

  async exec({ id, name }: EditUserUsecaseRequest): Promise<EditUserResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) return left(new ResourceNotFoundError());

    user.name = name;

    await this.usersRepository.save(user);

    return right({ user });
  }
}
