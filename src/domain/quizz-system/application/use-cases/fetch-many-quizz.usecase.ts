import { Either, right } from '@/core/types/either';
import { QuizzesRepository } from '../repositories/quizzes.repository';
import { Quizz } from '../../entities/quizz.entity';
import { Injectable } from '@nestjs/common';

type FetchManyQuizzesResponse = Either<null, {quizzes: Quizz[]}>;

@Injectable()
export class FetchManyQuizzesUsecase {
  constructor(private quizzsRepository: QuizzesRepository) {}

  async exec(): Promise<FetchManyQuizzesResponse> {
    const quizzes = await this.quizzsRepository.findMany();

    return right({quizzes});
  }
}
