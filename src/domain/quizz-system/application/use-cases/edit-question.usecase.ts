import { Either, left, right } from '@/core/types/either';
import { Question } from '../../entities/question.entity';
import { QuestionsRepository } from '../repositories/questions.repository';
import { Answer, AnswerProps } from '../../entities/answer.entity';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { QuizzesRepository } from '../repositories/quizzes.repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { AnswersList } from '../../entities/answers-list';
import { AnswersRepository } from '../repositories/answers.repository';



interface EditQuestionUsecaseRequest {
  questionId: string;
  title: string;
  description: string;
  videoURL?: string;
  audioURL?: string;
} 

type EditQuestionResponse = Either<
  ResourceNotFoundError,
  { question: Question }
>;

export class EditQuestionUsecase {
  constructor(
    private questionsRepository: QuestionsRepository,
  ) {}

  async exec({
    questionId,
    description,
    title,
    audioURL,
    videoURL,
  }: EditQuestionUsecaseRequest): Promise<EditQuestionResponse> {
    const question = await this.questionsRepository.findById(questionId);
    if (!question) return left(new ResourceNotFoundError());

    question.title = title
    question.description = description
    question.audioURL = audioURL
    question.videoURL = videoURL

    await this.questionsRepository.save(question);

    return right({ question });
  }
}
