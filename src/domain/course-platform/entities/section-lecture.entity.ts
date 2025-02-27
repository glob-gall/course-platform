import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { SectionItemProps } from '@/domain/course-platform/entities/section-item.entity';

export interface SectionLectureProps extends SectionItemProps {
  lectureId: UniqueEntityID;
}

export class SectionLecture extends Entity<SectionLectureProps> {
  get lectureId() {
    return this.props.lectureId;
  }
  get title() {
    return this.props.title;
  }
  get sectionId() {
    return this.props.sectionId;
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
    props: Optional<SectionLectureProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): SectionLecture {
    const sectionLecture = new SectionLecture(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return sectionLecture;
  }
}
