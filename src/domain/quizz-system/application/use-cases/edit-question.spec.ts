import {
  EditQuestionUsecase,
} from './edit-question.usecase';
import { InMemoryQuestionsRepository } from '@/test/repositories/im-memory-questions.repository';

import { makeQuestion } from '@/test/factories/make-question';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';

let questionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUsecase;

describe('Edit Section Use Case', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUsecase(
      questionsRepository,
    );
  });

  it('should be able to edit a section', async () => {
    const question = makeQuestion()

    questionsRepository.items.push(question)
    const response = await sut.exec({
      title: 'title-01',
      description: 'description-01',
      questionId: question.id.toString(),
    });

    expect(response.isRight()).toBeTruthy();

    expect(questionsRepository.items[0].title).toEqual('title-01');
    expect(questionsRepository.items[0].description).toEqual('description-01');
  });

  it('should not be able to edit a not existent section', async () => {
    const question = makeQuestion()

    const response = await sut.exec({
      title: 'title-01',
      description: 'description-0',
      questionId: 'fake-id',
    });

    expect(response.isLeft()).toBeTruthy();
    if(response.isLeft()){
      expect(response.value).toBeInstanceOf(ResourceNotFoundError)
    }
  });
});
