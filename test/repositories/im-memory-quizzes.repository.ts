import { QuizzesRepository } from '@/domain/quizz-system/application/repositories/quizzes.repository';
import { Quizz } from '@/domain/quizz-system/entities/quizz.entity';

export class InMemoryQuizzesRepository implements QuizzesRepository {
  public items: Quizz[] = [];
  async create(quizz: Quizz): Promise<void> {
    this.items.push(quizz);
  }

  async save(quizz: Quizz): Promise<void> {
    const quizzIndex = this.items.findIndex((item) => item.id === quizz.id);
    this.items[quizzIndex] = quizz;
  }

  async findById(id: string): Promise<Quizz | null> {
    const quizz = this.items.find((item) => item.id.toString() === id);
    if (!quizz) return null;
    return quizz;
  }

  async delete(quizz: Quizz): Promise<void> {
    const quizzIndex = this.items.findIndex((item) => item.id === quizz.id);
    this.items.splice(quizzIndex, 1);
  }
}
