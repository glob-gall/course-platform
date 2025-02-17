import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface SectionProps {
  courseId: UniqueEntityID;
  title: string;
  description: string;

  createdAt: Date;
  updatedAt?: Date | null;
}

export class Section extends Entity<SectionProps> {
  get title() {
    return this.props.title;
  }
  set title(title: string) {
    this.props.title = title;

    this.touch();
  }

  get courseId() {
    return this.props.courseId;
  }

  get description() {
    return this.props.description;
  }
  set description(description: string) {
    this.props.description = description;

    this.touch();
  }

  touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<SectionProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): Section {
    const section = new Section(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return section;
  }
}
