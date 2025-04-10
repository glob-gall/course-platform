import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { Lecture } from '@/domain/lecture-system/entities/lecture.entity';
import { Quizz } from '@/domain/quizz-system/entities/quizz.entity';

export interface SectionItemProps {
  sectionId: UniqueEntityID;
  quizz?: Quizz | null;
  lecture?: Lecture | null;
  externalUrl?: string | null;

  createdAt: Date;
  updatedAt?: Date | null;
}

export class SectionItem extends Entity<SectionItemProps> {
  get quizz() {
    return this.props.quizz;
  }
  set quizz(quizz: Quizz | undefined | null) {
    this.props.quizz = quizz;

    this.touch();
  }
  get lecture() {
    return this.props.lecture;
  }
  set lecture(lecture: Lecture | undefined | null) {
    this.props.lecture = lecture;

    this.touch();
  }
  get externalUrl() {
    return this.props.externalUrl;
  }
  set externalUrl(externalUrl: string | undefined | null) {
    this.props.externalUrl = externalUrl;

    this.touch();
  }

  get sectionId() {
    return this.props.sectionId;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<SectionItemProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): SectionItem {
    const section = new SectionItem(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return section;
  }
}
