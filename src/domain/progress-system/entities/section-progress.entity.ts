import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { SectionItemProgress } from './section-item-progress.entity';
import { Section } from '@/domain/course-platform/entities/section.entity';

export interface SectionProgressProps {
  itemsProgress: SectionItemProgress[];
  section: Section;

  createdAt: Date;
  updatedAt?: Date | null;
}

export class SectionProgress extends Entity<SectionProgressProps> {
  get section() {
    return this.props.section;
  }
  get itemsProgress() {
    return this.props.itemsProgress;
  }
  touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<SectionProgressProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): SectionProgress {
    const user = new SectionProgress(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return user;
  }
}
