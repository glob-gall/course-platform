import { Either, left, right } from '@/core/types/either';
import { Quizz } from '../../entities/quizz.entity';
import { QuizzesRepository } from '../repositories/quizzes.repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';

interface EditQuizzUsecaseRequest {
  id: string;
  description: string;
  title: string;
}

type EditQuizzResponse = Either<ResourceNotFoundError, { quizz: Quizz }>;

export class EditQuizzUsecase {
  constructor(private quizzsRepository: QuizzesRepository) {}

  async exec({
    id,
    description,
    title,
  }: EditQuizzUsecaseRequest): Promise<EditQuizzResponse> {
    const quizz = await this.quizzsRepository.findById(id);

    if (!quizz) return left(new ResourceNotFoundError());

    quizz.description = description;
    quizz.title = title;

    await this.quizzsRepository.save(quizz);

    return right({ quizz });
  }
}
