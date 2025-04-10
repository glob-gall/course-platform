import { Entity } from '@/core/entities/entity';
import { Slug } from '@/core/entities/value-objects/slug';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { Section } from './section.entity';

export interface CourseProps {
  title: string;
  slug: Slug;
  description: string;
  sections: Section[];
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Course extends Entity<CourseProps> {
  get title() {
    return this.props.title;
  }
  set title(title: string) {
    this.props.title = title;

    this.touch();
  }

  get sections() {
    return this.props.sections;
  }

  set sections(sections: Section[]) {
    this.props.sections = sections;

    this.touch();
  }
  get slug() {
    return this.props.slug;
  }

  set slug(slug: Slug) {
    this.props.slug = slug;

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
    props: Optional<CourseProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): Course {
    const course = new Course(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return course;
  }
}
