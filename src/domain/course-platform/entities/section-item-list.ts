import { WatchedList } from '@/core/entities/watched-list';
import { SectionItem } from './section-item.entity';

export class SectionItemList extends WatchedList<SectionItem> {
  compareItems(a: SectionItem, b: SectionItem): boolean {
    return a.id.equals(b.id);
  }
}
