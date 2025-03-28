import { Either, left, right } from '@/core/types/either';
import { UsersRepository } from '../repositories/users.repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';

interface DeleteUserUsecaseRequest {
  id: string;
}

type DeleteUserResponse = Either<ResourceNotFoundError, null>;

export class DeleteUserUsecase {
  constructor(private usersRepository: UsersRepository) {}

  async exec({ id }: DeleteUserUsecaseRequest): Promise<DeleteUserResponse> {
    const user = await this.usersRepository.findById(id);
    if (!user) return left(new ResourceNotFoundError());

    await this.usersRepository.delete(user);

    return right(null);
  }
}
