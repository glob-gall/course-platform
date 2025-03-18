import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Lecture } from '@/domain/lecture-system/entities/lecture.entity';
import { Lecture as PrismaLecture } from '@prisma/client';

export class PrismaLectureMapper {
  static toPrisma(lecture: Lecture): PrismaLecture {
    return {
      audioURL: lecture.audioURL ?? null,
      videoURL: lecture.videoURL ?? null,
      externalResource: lecture.externalResource ?? null,
      id: lecture.id.toString(),
      description: lecture.description,
      title: lecture.title,
      createdAt: lecture.createdAt,
      updatedAt: lecture.updatedAt ?? null,
    };
  }

  static toDomain(raw: PrismaLecture): Lecture {
    const lecture = Lecture.create(
      {
        description: raw.description ?? '',
        audioURL: raw.audioURL,
        videoURL: raw.videoURL,
        externalResource: raw.externalResource,
        title: raw.title,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );

    return lecture;
  }
}
