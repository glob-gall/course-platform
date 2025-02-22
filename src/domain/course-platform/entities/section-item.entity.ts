import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface SectionItemProps {
  sectionId: UniqueEntityID;
  title?: string | null;
  description?: string | null;

  createdAt: Date;
  updatedAt?: Date | null;
}

export class SectionItem extends Entity<SectionItemProps> {
  get title() {
    return this.props.title;
  }

  set title(title: string | undefined | null) {
    this.props.title = title;

    this.touch();
  }

  get sectionId() {
    return this.props.sectionId;
  }

  get description() {
    return this.props.description;
  }
  set description(description: string | undefined | null) {
    this.props.description = description;

    this.touch();
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
