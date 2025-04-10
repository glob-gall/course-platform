import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { SectionItem } from './section-item.entity';

export interface SectionProps {
  courseId: UniqueEntityID;
  title: string;
  description: string;

  items: SectionItem[];

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
  get items() {
    return this.props.items;
  }
  set items(items: SectionItem[]) {
    this.props.items = items;
    this.touch();
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
