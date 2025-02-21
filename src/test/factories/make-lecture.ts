import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import {
  Lecture,
  LectureProps,
} from '@/domain/lecture-system/entities/lecture.entity';

export function makeLecture(
  override: Partial<LectureProps> = {},
  id?: UniqueEntityID,
) {
  const title = faker.word.words(4);

  const lecture = Lecture.create(
    {
      description: faker.lorem.text(),
      title,
      ...override,
    },
    id,
  );

  return lecture;
}
