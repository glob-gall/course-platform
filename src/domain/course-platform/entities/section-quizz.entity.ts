import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { SectionItemProps } from '@/domain/course-platform/entities/section-item.entity';

export interface SectionQuizzProps extends SectionItemProps {
  quizzId: UniqueEntityID;
}

export class SectionQuizz extends Entity<SectionQuizzProps> {
  get quizzId() {
    return this.props.quizzId;
  }
  get sectionId() {
    return this.props.sectionId;
  }
  get title() {
    return this.props.title;
  }
  get description() {
    return this.props.description;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(
    props: Optional<SectionQuizzProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): SectionQuizz {
    const sectionQuizz = new SectionQuizz(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return sectionQuizz;
  }
}
