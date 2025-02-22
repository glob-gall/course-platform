import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Quizz, QuizzProps } from '@/domain/quizz-system/entities/quizz.entity';

export function makeQuizz(
  override: Partial<QuizzProps> = {},
  id?: UniqueEntityID,
) {
  const title = faker.word.words(4);

  const quizz = Quizz.create(
    {
      description: faker.lorem.text(),
      title,
      ...override,
    },
    id,
  );

  return quizz;
}
