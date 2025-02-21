import { Either, right } from '@/core/types/either';
import { Quizz } from '../../entities/quizz.entity';
import { QuizzesRepository } from '../repositories/quizzes.repository';

interface CreateQuizzUsecaseRequest {
  description: string;
  title: string;
}

type CreateQuizzResponse = Either<null, { quizz: Quizz }>;

export class CreateQuizzUsecase {
  constructor(private quizzesRepository: QuizzesRepository) {}

  async exec({
    description,
    title,
  }: CreateQuizzUsecaseRequest): Promise<CreateQuizzResponse> {
    const quizz = Quizz.create({
      title,
      description,
    });
    await this.quizzesRepository.create(quizz);

    return right({ quizz });
  }
}
