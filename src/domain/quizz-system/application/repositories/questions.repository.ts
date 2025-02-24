import { Question } from '../../entities/question.entity';

export abstract class QuestionsRepository {
  abstract create(question: Question): Promise<void>;
  abstract save(question: Question): Promise<void>;
  abstract delete(question: Question): Promise<void>;
  abstract findById(id: string): Promise<Question | null>;
}
