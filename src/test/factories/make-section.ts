import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import {
  Section,
  SectionProps,
} from '@/domain/course-platform/entities/section.entity';

export function makeSection(
  override: Partial<SectionProps> = {},
  id?: UniqueEntityID,
) {
  const title = faker.word.words(4);

  const section = Section.create(
    {
      description: faker.lorem.text(),
      courseId: new UniqueEntityID(),
      items: [],
      title,
      ...override,
    },
    id,
  );

  return section;
}
