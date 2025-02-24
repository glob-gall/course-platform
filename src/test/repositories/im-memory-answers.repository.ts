import { AnswersRepository } from '@/domain/quizz-system/application/repositories/answers.repository';
import { Answer } from '@/domain/quizz-system/entities/answer.entity';

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = [];

  async createMany(answers: Answer[]): Promise<void> {
    this.items.push(...answers);
  }
  async deleteManyByQuestionId(questionId: string): Promise<void> {
    this.items = this.items.filter(
      (item) => item.questionId.toString() !== questionId,
    );
  }
}
