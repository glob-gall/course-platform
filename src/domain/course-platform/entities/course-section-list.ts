import { WatchedList } from '@/core/entities/watched-list';
import { Section } from './section.entity';

export class CourseSectionList extends WatchedList<Section> {
  compareItems(a: Section, b: Section): boolean {
    return a.id.equals(b.id);
  }
}
