import { Either, left, right } from '@/core/types/either';
import { Question } from '../../entities/question.entity';
import { QuestionsRepository } from '../repositories/questions.repository';
import { Answer, AnswerProps } from '../../entities/answer.entity';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { QuizzesRepository } from '../repositories/quizzes.repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { AnswersList } from '../../entities/answers-list';
import { AnswersRepository } from '../repositories/answers.repository';

export type CreateAnswerProps = Omit<AnswerProps, 'createdAt' | 'questionId'>;

interface CreateQuestionUsecaseRequest {
  quizzId: string;
  title: string;
  description: string;
  videoURL?: string;
  audioURL?: string;
  answersData: CreateAnswerProps[];
  correctAnswersData: CreateAnswerProps[];
}

type CreateQuestionResponse = Either<
  ResourceNotFoundError,
  { question: Question }
>;

export class CreateQuestionUsecase {
  constructor(
    private quizzesRepository: QuizzesRepository,
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository,
  ) {}

  async exec({
    quizzId,
    description,
    title,
    audioURL,
    videoURL,
    answersData,
    correctAnswersData,
  }: CreateQuestionUsecaseRequest): Promise<CreateQuestionResponse> {
    const quizz = this.quizzesRepository.findById(quizzId);
    if (!quizz) return left(new ResourceNotFoundError());

    const answersList = new AnswersList();
    const correctAnswersList = new AnswersList();

    const question = Question.create({
      title,
      description,
      answers: answersList,
      correctAnswers: correctAnswersList,
      quizzId: new UniqueEntityID(quizzId),
      videoURL,
      audioURL,
    });

    const answers = answersData.map((item) =>
      Answer.create({ ...item, questionId: question.id }),
    );
    const correctAnswers = correctAnswersData.map((item) =>
      Answer.create({ ...item, questionId: question.id }),
    );

    question.answers.update(answers);
    question.correctAnswers.update(correctAnswers);

    await this.answersRepository.createMany(question.answers.getItems());
    await this.answersRepository.createMany(question.correctAnswers.getItems());

    await this.questionsRepository.create(question);

    return right({ question });
  }
}
