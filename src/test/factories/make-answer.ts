import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import {
  Answer,
  AnswerProps,
} from '@/domain/quizz-system/entities/answer.entity';

export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityID,
) {
  const answer = Answer.create(
    {
      isCorrect: false,
      questionId: new UniqueEntityID(),
      description: faker.lorem.text(),
      ...override,
    },
    id,
  );

  return answer;
}
