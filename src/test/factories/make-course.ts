import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import {
  Course,
  CourseProps,
} from '@/domain/course-platform/entities/course.entity';
import { Slug } from '@/core/entities/value-objects/slug';

export function makeCourse(
  override: Partial<CourseProps> = {},
  id?: UniqueEntityID,
) {
  const title = faker.word.words(4);

  const course = Course.create(
    {
      description: faker.lorem.text(),
      title,
      sections: [],
      slug: Slug.createFromText(title),
      ...override,
    },
    id,
  );

  return course;
}
