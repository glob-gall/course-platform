import { Either, left, right } from '@/core/types/either';
import { SectionLecture } from '../../entities/section-lecture.entity';
import { SectionLecturesRepository } from '../repositories/section-lectures.repository';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { SectionsRepository } from '../repositories/sections.repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { LecturesRepository } from '@/domain/lecture-system/application/repositories/lectures.repository';
import { Lecture } from '@/domain/lecture-system/entities/lecture.entity';
import { Injectable } from '@nestjs/common';

interface CreateSectionLectureUsecaseRequest {
  description: string;
  title: string;
  sectionId: string;
  lectureTitle: string;
  lectureDescription: string;
  lectureVideoURL?: string;
  lectureAudioURL?: string;
  lectureExternalResource?: string;
}

type CreateSectionLectureResponse = Either<
  ResourceNotFoundError,
  { sectionlecture: SectionLecture }
>;

@Injectable()
export class CreateSectionLectureUsecase {
  constructor(
    private lecturesRepository: LecturesRepository,
    private sectionsRepository: SectionsRepository,
    private sectionlecturesRepository: SectionLecturesRepository,
  ) {}

  async exec({
    title,
    sectionId,
    description,
    lectureDescription,
    lectureTitle,
    lectureAudioURL,
    lectureVideoURL,
    lectureExternalResource,
  }: CreateSectionLectureUsecaseRequest): Promise<CreateSectionLectureResponse> {
    const section = await this.sectionsRepository.findById(sectionId);

    if (!section) return left(new ResourceNotFoundError());

    const lecture = Lecture.create({
      description: lectureDescription,
      title: lectureTitle,
      videoURL: lectureVideoURL,
      audioURL: lectureAudioURL,
      externalResource: lectureExternalResource,
    });

    await this.lecturesRepository.create(lecture);
    const sectionlecture = SectionLecture.create({
      description,
      lectureId: lecture.id,
      sectionId: new UniqueEntityID(sectionId),
      title,
    });
    await this.sectionlecturesRepository.create(sectionlecture);

    return right({ sectionlecture });
  }
}
