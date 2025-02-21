import { Either, left, right } from '@/core/types/either';
import { LecturesRepository } from '../repositories/lectures.repository';
import { ResourceNotFoundError } from './errors/resource-not-found.error';

interface DeleteLectureUsecaseRequest {
  id: string;
}

type DeleteLectureResponse = Either<ResourceNotFoundError, null>;

export class DeleteLectureUsecase {
  constructor(private lecturesRepository: LecturesRepository) {}

  async exec({
    id,
  }: DeleteLectureUsecaseRequest): Promise<DeleteLectureResponse> {
    const lecture = await this.lecturesRepository.findById(id);
    if (!lecture) return left(new ResourceNotFoundError());

    await this.lecturesRepository.delete(lecture);

    return right(null);
  }
}
