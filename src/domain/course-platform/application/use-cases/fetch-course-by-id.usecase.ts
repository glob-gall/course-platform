import { Either, left, right } from '@/core/types/either';
import { CoursesRepository } from '../repositories/courses.repository';
import { Course } from '../../entities/course.entity';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';

interface FetchCourseByIdUsecaseRequest {
  id: string;
}

type FetchCourseByIdResponse = Either<
  ResourceNotFoundError,
  { course: Course }
>;

export class FetchCourseByIdUsecase {
  constructor(private coursesRepository: CoursesRepository) {}

  async exec({
    id,
  }: FetchCourseByIdUsecaseRequest): Promise<FetchCourseByIdResponse> {
    const course = await this.coursesRepository.findById(id);
    if (!course) return left(new ResourceNotFoundError());

    return right({ course });
  }
}
