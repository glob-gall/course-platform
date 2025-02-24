import { Answer } from '../../entities/answer.entity';

export abstract class AnswersRepository {
  abstract createMany(answers: Answer[]): Promise<void>;
  abstract deleteManyByQuestionId(questionId: string): Promise<void>;
}
