import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';

import {
  UserCourse,
  UserCourseProps,
} from '@/domain/progress-system/entities/user-course.entity';
import { makeCourse } from './make-course';
import { makeUser } from './make-user';

export function makeUserCourse(
  override: Partial<UserCourseProps> = {},
  id?: UniqueEntityID,
) {
  const userCourse = UserCourse.create(
    {
      course: makeCourse(),
      user: makeUser(),
      progress: [],
      ...override,
    },
    id,
  );

  return userCourse;
}
