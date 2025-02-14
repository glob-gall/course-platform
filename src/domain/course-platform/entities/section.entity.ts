import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';

export interface SectionProps {
  courseId: UniqueEntityID;
  title: string;
  description: string;
}

export class Section extends Entity<SectionProps> {
  get title() {
    return this.props.title;
  }
  set title(title: string) {
    this.props.title = title;
  }

  get courseId() {
    return this.props.courseId;
  }

  get description() {
    return this.props.description;
  }
  set description(description: string) {
    this.props.description = description;
  }

  static create(props: SectionProps, id?: UniqueEntityID): Section {
    const section = new Section(props, id);
    return section;
  }
}
