import { Either, right } from '@/core/types/either';
import { Lecture } from '../../entities/lecture.entity';
import { LecturesRepository } from '../repositories/lectures.repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';

export interface CreateLectureUsecaseRequest {
  description: string;
  title: string;
  videoURL?: string;
  audioURL?: string;
  externalResource?: string;
}

type CreateLectureResponse = Either<
  ResourceNotFoundError,
  { lecture: Lecture }
>;

export class CreateLectureUsecase {
  constructor(private lecturesRepository: LecturesRepository) {}

  async exec({
    title,
    description,
    videoURL,
    audioURL,
    externalResource,
  }: CreateLectureUsecaseRequest): Promise<CreateLectureResponse> {
    const lecture = Lecture.create({
      title,
      description,
      videoURL,
      audioURL,
      externalResource,
    });

    await this.lecturesRepository.create(lecture);

    return right({ lecture });
  }
}
