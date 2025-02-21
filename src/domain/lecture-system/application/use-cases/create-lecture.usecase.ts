import { Either, right } from '@/core/types/either';
import { Lecture } from '../../entities/lecture.entity';
import { LecturesRepository } from '../repositories/lectures.repository';

interface CreateLectureUsecaseRequest {
  description: string;
  title: string;
  videoURL?: string;
  audioURL?: string;
}

type CreateLectureResponse = Either<null, { lecture: Lecture }>;

export class CreateLectureUsecase {
  constructor(private lecturesRepository: LecturesRepository) {}

  async exec({
    title,
    description,
    videoURL,
    audioURL,
  }: CreateLectureUsecaseRequest): Promise<CreateLectureResponse> {
    const lecture = Lecture.create({
      title,
      description,
      videoURL,
      audioURL,
    });
    await this.lecturesRepository.create(lecture);

    return right({ lecture });
  }
}
