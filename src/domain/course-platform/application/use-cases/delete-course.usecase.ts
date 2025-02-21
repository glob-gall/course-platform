import { Either, left, right } from '@/core/types/either';
import { CoursesRepository } from '../repositories/courses.repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';

interface DeleteCourseUsecaseRequest {
  id: string;
}

type DeleteCourseResponse = Either<ResourceNotFoundError, null>;

export class DeleteCourseUsecase {
  constructor(private coursesRepository: CoursesRepository) {}

  async exec({
    id,
  }: DeleteCourseUsecaseRequest): Promise<DeleteCourseResponse> {
    const course = await this.coursesRepository.findById(id);
    if (!course) return left(new ResourceNotFoundError());

    await this.coursesRepository.delete(course);

    return right(null);
  }
}
