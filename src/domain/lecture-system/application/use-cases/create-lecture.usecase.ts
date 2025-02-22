import { Either, left, right } from '@/core/types/either';
import { Lecture } from '../../entities/lecture.entity';
import { LecturesRepository } from '../repositories/lectures.repository';
import { SectionsRepository } from '@/domain/course-platform/application/repositories/sections.repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';

interface CreateLectureUsecaseRequest {
  description: string;
  sectionId: string;
  title: string;
  videoURL?: string;
  audioURL?: string;
}

type CreateLectureResponse = Either<
  ResourceNotFoundError,
  { lecture: Lecture }
>;

export class CreateLectureUsecase {
  constructor(
    private sectionsRepository: SectionsRepository,
    private lecturesRepository: LecturesRepository,
  ) {}

  async exec({
    title,
    sectionId,
    description,
    videoURL,
    audioURL,
  }: CreateLectureUsecaseRequest): Promise<CreateLectureResponse> {
    const section = this.sectionsRepository.findById(sectionId);
    if (!section) {
      return left(new ResourceNotFoundError());
    }
    const lecture = Lecture.create({
      title,
      sectionId: new UniqueEntityID(sectionId),
      description,
      videoURL,
      audioURL,
    });

    await this.lecturesRepository.create(lecture);

    return right({ lecture });
  }
}
