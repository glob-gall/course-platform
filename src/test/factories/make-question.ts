import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import {
  Question,
  QuestionProps,
} from '@/domain/quizz-system/entities/question.entity';
import { AnswersList } from '@/domain/quizz-system/entities/answers-list';

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityID,
) {
  const title = faker.word.words(4);

  const question = Question.create(
    {
      title,
      description: faker.lorem.text(),
      answers: new AnswersList(),
      quizzId: new UniqueEntityID(),
      ...override,
    },
    id,
  );

  return question;
}
