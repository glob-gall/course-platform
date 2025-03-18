import { Either, left, right } from '@/core/types/either';
import { Question } from '../../entities/question.entity';
import { QuestionsRepository } from '../repositories/questions.repository';
import { Answer, AnswerProps } from '../../entities/answer.entity';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { QuizzesRepository } from '../repositories/quizzes.repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { AnswersRepository } from '../repositories/answers.repository';
import { Injectable } from '@nestjs/common';

export type CreateAnswerProps = Omit<
  AnswerProps,
  'createdAt' | 'questionId' | 'updatedAt'
>;

interface CreateQuestionUsecaseRequest {
  quizzId: string;
  title: string;
  description: string;
  videoURL?: string;
  imageURL?: string;
  externalResource?: string;
  audioURL?: string;
  answersData: CreateAnswerProps[];
}

type CreateQuestionResponse = Either<
  ResourceNotFoundError,
  { question: Question }
>;

@Injectable()
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
    externalResource,
    imageURL,
    videoURL,
    answersData,
  }: CreateQuestionUsecaseRequest): Promise<CreateQuestionResponse> {
    const quizz = this.quizzesRepository.findById(quizzId);
    if (!quizz) return left(new ResourceNotFoundError());

    const question = Question.create({
      title,
      description,
      quizzId: new UniqueEntityID(quizzId),
      videoURL,
      externalResource,
      imageURL,
      audioURL,
    });

    const answers = answersData.map((item) =>
      Answer.create({ ...item, questionId: question.id }),
    );

    await this.questionsRepository.create(question);
    await this.answersRepository.createMany(answers);

    return right({ question });
  }
}
