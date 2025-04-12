import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import {
  SectionItem,
  SectionItemProps,
} from '@/domain/course-platform/entities/section-item.entity';
import { makeLecture } from './make-lecture';

export function makeSectionItem(
  override: Partial<SectionItemProps> = {},
  id?: UniqueEntityID,
) {
  const sectionItem = SectionItem.create(
    {
      lecture: makeLecture(),
      ...override,
    },
    id,
  );

  return sectionItem;
}
