import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import {
  SectionItemProgress,
  SectionItemProgressProps,
} from '@/domain/progress-system/entities/section-item-progress.entity';
import { makeSectionItem } from './make-section-item';

export function makeSectionItemProgress(
  override: Partial<SectionItemProgressProps> = {},
  id?: UniqueEntityID,
) {
  const sectionItemProgress = SectionItemProgress.create(
    {
      concluded: false,
      sectionItem: makeSectionItem(),
      ...override,
    },
    id,
  );

  return sectionItemProgress;
}
