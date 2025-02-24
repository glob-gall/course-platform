import { SectionLecturesRepository } from '@/domain/course-platform/application/repositories/section-lectures.repository';
import { SectionLecture } from '@/domain/course-platform/entities/section-lecture.entity';

export class InMemorySectionLecturesRepository
  implements SectionLecturesRepository
{
  public items: SectionLecture[] = [];
  async create(section: SectionLecture): Promise<void> {
    this.items.push(section);
  }

  async save(section: SectionLecture): Promise<void> {
    const sectionIndex = this.items.findIndex((item) => item.id === section.id);
    this.items[sectionIndex] = section;
  }

  async delete(section: SectionLecture): Promise<void> {
    const sectionIndex = this.items.findIndex((item) => item.id === section.id);
    this.items.splice(sectionIndex, 1);
  }
}
