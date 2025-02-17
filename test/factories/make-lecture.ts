import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import {
  Lecture,
  LectureProps,
} from '@/domain/course-platform/entities/lecture.entity';

export function makeLecture(
  override: Partial<LectureProps> = {},
  id?: UniqueEntityID,
) {
  const title = faker.word.words(4);

  const lecture = Lecture.create(
    {
      description: faker.lorem.text(),
      sectionId: new UniqueEntityID(),
      title,
      ...override,
    },
    id,
  );

  return lecture;
}
