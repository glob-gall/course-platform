import { QuestionsRepository } from '@/domain/quizz-system/application/repositories/questions.repository';
import { Question } from '@/domain/quizz-system/entities/question.entity';

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = [];
  async create(question: Question): Promise<void> {
    this.items.push(question);
  }

  async save(question: Question): Promise<void> {
    const questionIndex = this.items.findIndex(
      (item) => item.id === question.id,
    );
    this.items[questionIndex] = question;
  }

  async findById(id: string): Promise<Question | null> {
    const question = this.items.find((item) => item.id.toString() === id);
    if (!question) return null;
    return question;
  }

  async delete(question: Question): Promise<void> {
    const questionIndex = this.items.findIndex(
      (item) => item.id === question.id,
    );
    this.items.splice(questionIndex, 1);
  }
}
