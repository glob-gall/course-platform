import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { SectionItemProps } from '@/domain/course-platform/entities/section-item.entity';
import { Lecture } from '@/domain/lecture-system/entities/lecture.entity';

export interface SectionLectureProps extends SectionItemProps {
  lectureId: UniqueEntityID;
  lecture?: Lecture | null;
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
  get lecture() {
    return this.props.lecture;
  }
  set lecture(lecture: Lecture | null | undefined) {
    this.props.lecture = lecture;
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
