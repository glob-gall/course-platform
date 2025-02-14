import { Entity } from '@/core/entities/entity';
import { Slug } from '@/core/entities/value-objects/slug';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';

export interface CourseProps {
  title: string;
  slug: Slug;
  description: string;
}

export class Course extends Entity<CourseProps> {
  get title() {
    return this.props.title;
  }
  set title(title: string) {
    this.props.title = title;
  }

  get slug() {
    return this.props.slug;
  }

  set slug(slug: Slug) {
    this.props.slug = slug;
  }

  get description() {
    return this.props.description;
  }
  set description(description: string) {
    this.props.description = description;
  }

  static create(props: CourseProps, id?: UniqueEntityID): Course {
    const course = new Course(props, id);
    return course;
  }
}
