import { SectionQuizzesRepository } from '@/domain/course-platform/application/repositories/section-quizzes.repository';
import { SectionQuizz } from '@/domain/course-platform/entities/section-quizz.entity';

export class InMemorySectionQuizzesRepository
  implements SectionQuizzesRepository
{
  public items: SectionQuizz[] = [];
  async create(section: SectionQuizz): Promise<void> {
    this.items.push(section);
  }

  async save(section: SectionQuizz): Promise<void> {
    const sectionIndex = this.items.findIndex((item) => item.id === section.id);
    this.items[sectionIndex] = section;
  }

  async delete(section: SectionQuizz): Promise<void> {
    const sectionIndex = this.items.findIndex((item) => item.id === section.id);
    this.items.splice(sectionIndex, 1);
  }
}
