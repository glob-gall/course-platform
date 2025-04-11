import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { SectionItem } from '@/domain/course-platform/entities/section-item.entity';

export interface SectionItemProgressProps {
  concluded: boolean;
  sectionItem: SectionItem;

  createdAt: Date;
  updatedAt?: Date | null;
}

export class SectionItemProgress extends Entity<SectionItemProgressProps> {
  get concluded() {
    return this.props.concluded;
  }
  set concluded(concluded: boolean) {
    this.props.concluded = concluded;
  }

  get sectionItem() {
    return this.props.sectionItem;
  }

  touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<SectionItemProgressProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): SectionItemProgress {
    const user = new SectionItemProgress(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return user;
  }
}
