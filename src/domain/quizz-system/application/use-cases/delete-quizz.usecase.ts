import { Either, left, right } from '@/core/types/either';
import { QuizzesRepository } from '../repositories/quizzes.repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';

interface DeleteQuizzUsecaseRequest {
  id: string;
}

type DeleteQuizzResponse = Either<ResourceNotFoundError, null>;

export class DeleteQuizzUsecase {
  constructor(private quizzsRepository: QuizzesRepository) {}

  async exec({ id }: DeleteQuizzUsecaseRequest): Promise<DeleteQuizzResponse> {
    const quizz = await this.quizzsRepository.findById(id);
    if (!quizz) return left(new ResourceNotFoundError());

    await this.quizzsRepository.delete(quizz);

    return right(null);
  }
}
