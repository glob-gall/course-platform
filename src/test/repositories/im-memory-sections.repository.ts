import { SectionsRepository } from '@/domain/course-platform/application/repositories/sections.repository';
import { Section } from '@/domain/course-platform/entities/section.entity';

export class InMemorySectionsRepository implements SectionsRepository {
  public items: Section[] = [];
  async create(section: Section): Promise<void> {
    this.items.push(section);
  }

  async save(section: Section): Promise<void> {
    const sectionIndex = this.items.findIndex((item) => item.id === section.id);
    this.items[sectionIndex] = section;
  }

  async findById(id: string): Promise<Section | null> {
    const section = this.items.find((item) => item.id.toString() === id);
    if (!section) return null;
    return section;
  }

  async delete(section: Section): Promise<void> {
    const sectionIndex = this.items.findIndex((item) => item.id === section.id);
    this.items.splice(sectionIndex, 1);
  }

  async findSectiosByCourseId(courseId: string): Promise<Section[]> {
    const sections = this.items.filter(
      (item) => item.courseId.toString() === courseId,
    );
    return sections;
  }
}
