import { InMemoryAnswersRepository } from '@/test/repositories/im-memory-answers.repository';
import {
  CreateAnswerProps,
  CreateQuestionUsecase,
} from './create-question.usecase';
import { InMemoryQuestionsRepository } from '@/test/repositories/im-memory-questions.repository';
import { InMemoryQuizzesRepository } from '@/test/repositories/im-memory-quizzes.repository';
import { makeQuizz } from '@/test/factories/make-quizz';

let quizzesRepository: InMemoryQuizzesRepository;
let questionsRepository: InMemoryQuestionsRepository;
let answersRepository: InMemoryAnswersRepository;
let sut: CreateQuestionUsecase;

describe('Create Section Use Case', () => {
  beforeEach(() => {
    quizzesRepository = new InMemoryQuizzesRepository();
    questionsRepository = new InMemoryQuestionsRepository();
    answersRepository = new InMemoryAnswersRepository();
    sut = new CreateQuestionUsecase(
      quizzesRepository,
      questionsRepository,
      answersRepository,
    );
  });

  it('should be able to create a section', async () => {
    const quizz = makeQuizz();
    const answer1: CreateAnswerProps = {
      description: 'answer-01',
    };
    const answer2: CreateAnswerProps = {
      description: 'answer-02',
    };

    const response = await sut.exec({
      description: 'description-01',
      title: 'title 01',
      answersData: [answer1],
      correctAnswersData: [answer2],
      quizzId: quizz.id.toString(),
    });

    expect(response.isRight()).toBeTruthy();

    expect(questionsRepository.items[0].title).toEqual('title 01');
    expect(questionsRepository.items[0].description).toEqual('description-01');
    expect(questionsRepository.items[0].answers.getItems()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ description: 'answer-01' }),
      ]),
    );
    expect(questionsRepository.items[0].correctAnswers.getItems()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ description: 'answer-02' }),
      ]),
    );
  });
});
