import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { AnswersList } from '@/domain/quizz-system/entities/answers-list';
import { Question } from '@/domain/quizz-system/entities/question.entity';
import { Question as PrismaQuestion, Answer as PrismaAnswer } from '@prisma/client';
import { PrismaAnswerMapper } from './prisma-answer.mapper';

export class PrismaQuestionMapper {
  static toPrisma(question: Question): PrismaQuestion {
    return {
      id: question.id.toString(),
      description: question.description,
      title: question.title,
      audioURL: question.audioURL ?? null,
      videoURL: question.videoURL ?? null,
      externalResource:question.externalResource ?? null,
      imageURL: question.imageURL ?? null,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt ?? null,
      quizzId: question.quizzId.toString(),
      
    };
  }

  static toDomain(raw: PrismaQuestion & {answers?:PrismaAnswer[]}): Question {
    const answerdomainAnswers = raw.answers ? raw.answers.map(PrismaAnswerMapper.toDomain) :  []
      
    const question = Question.create({
        description: raw.description ?? '',
        title: raw.title,
        quizzId: new UniqueEntityID(raw.quizzId),
        answers: new AnswersList(answerdomainAnswers),
        audioURL: raw.audioURL,
        externalResource: raw.externalResource,
        imageURL: raw.imageURL,
        videoURL: raw.videoURL,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );

    return question;
  }
}
