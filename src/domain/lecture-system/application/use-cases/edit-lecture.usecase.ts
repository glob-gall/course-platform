import { Either, left, right } from '@/core/types/either';
import { Lecture } from '../../entities/lecture.entity';
import { LecturesRepository } from '../repositories/lectures.repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';

interface EditLectureUsecaseRequest {
  id: string;
  description: string;
  title: string;
  videoURL?: string;
  audioURL?: string;
}

type EditLectureResponse = Either<ResourceNotFoundError, { lecture: Lecture }>;

export class EditLectureUsecase {
  constructor(private lecturesRepository: LecturesRepository) {}

  async exec({
    id,
    description,
    audioURL,
    videoURL,
    title,
  }: EditLectureUsecaseRequest): Promise<EditLectureResponse> {
    const lecture = await this.lecturesRepository.findById(id);

    if (!lecture) return left(new ResourceNotFoundError());

    lecture.description = description;
    lecture.title = title;
    lecture.videoURL = videoURL;
    lecture.audioURL = audioURL;
    
    await this.lecturesRepository.save(lecture);

    return right({ lecture });
  }
}
