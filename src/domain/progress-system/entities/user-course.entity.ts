import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { User } from '@/domain/user-system/entities/user.entity';
import { Course } from '@/domain/course-platform/entities/course.entity';
import { SectionProgress } from './section-progress.entity';

export interface UserCourseProps {
  user: User;
  course: Course;

  progress: SectionProgress[];

  createdAt: Date;
  updatedAt?: Date | null;
}

export class UserCourse extends Entity<UserCourseProps> {
  get progress() {
    return this.props.progress;
  }

  get user() {
    return this.props.user;
  }
  get course() {
    return this.props.course;
  }

  touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<UserCourseProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): UserCourse {
    const user = new UserCourse(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return user;
  }
}
