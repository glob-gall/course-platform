import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Answer } from '@/domain/quizz-system/entities/answer.entity';
import { Answer as PrismaAnswer } from '@prisma/client';

export class PrismaAnswerMapper {
  static toPrisma(answer: Answer): PrismaAnswer {
    return {
      id: answer.id.toString(),
      description: answer.description,
      audioURL: answer.audioURL ?? null,
      videoURL: answer.videoURL ?? null,
      imageURL: answer.imageURL ?? null,
      externalResource: answer.externalResource ?? null,
      isCorrect: answer.isCorrect,
      questionId: answer.questionId.toString(),
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt ?? null,
    };
  }

  static toDomain(raw: PrismaAnswer): Answer {
    const answer = Answer.create(
      {
        description: raw.description ?? '',
        questionId: new UniqueEntityID(raw.questionId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        isCorrect: raw.isCorrect,
        audioURL: raw.audioURL,
        videoURL: raw.videoURL,
        externalResource: raw.externalResource,
        imageURL: raw.imageURL,

      },
      new UniqueEntityID(raw.id),
    );

    return answer;
  }
}
