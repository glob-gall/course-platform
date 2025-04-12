import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import {
  SectionProgress,
  SectionProgressProps,
} from '@/domain/progress-system/entities/section-progress.entity';
import { makeSection } from './make-section';

export function makeSectionProgress(
  override: Partial<SectionProgressProps> = {},
  id?: UniqueEntityID,
) {
  const sectionProgress = SectionProgress.create(
    {
      section: makeSection(),
      itemsProgress: [],
      ...override,
    },
    id,
  );

  return sectionProgress;
}
