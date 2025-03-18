import { Either, left, right } from '@/core/types/either';
import { Question } from '../../entities/question.entity';
import { QuestionsRepository } from '../repositories/questions.repository';
import { Injectable } from '@nestjs/common';



interface FetchManyQuestionsUsecaseRequest {

} 

type FetchManyQuestionsResponse = Either<
  null,
  { questions: Question[] }
>;

@Injectable()
export class FetchManyQuestionsUsecase {
  constructor(
    private questionsRepository: QuestionsRepository,
  ) {}

  async exec({
  }: FetchManyQuestionsUsecaseRequest): Promise<FetchManyQuestionsResponse> {
    const questions = await this.questionsRepository.findMany();



    return right({ questions });
  }
}
