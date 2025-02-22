import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { SectionItemProps } from '@/domain/course-platform/entities/section-item.entity';

export interface SectionQuizzProps extends SectionItemProps {
  quizzId?: UniqueEntityID;
}

export class SectionQuizz extends Entity<SectionQuizzProps> {
  get quizzId() {
    return this.props.quizzId;
  }

  static create(
    props: Optional<SectionItemProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): SectionQuizz {
    const section = new SectionQuizz(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return section;
  }
}
