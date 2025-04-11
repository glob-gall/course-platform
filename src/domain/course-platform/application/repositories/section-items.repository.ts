import { SectionItem } from '../../entities/section-item.entity';

export abstract class SectionItemsRepository {
  abstract create(sectionItem: SectionItem): Promise<void>;
  abstract delete(sectionItem: SectionItem): Promise<void>;
  abstract findById(id: string): Promise<SectionItem | null>;
}
