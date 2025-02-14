import { Either, left, right } from '@/core/types/either';
import { CoursesRepository } from '../repositories/courses.repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { Course } from '../../entities/course.entity';

interface FetchCourseBySlugUsecaseRequest {
  slug: string;
}

type FetchCourseBySlugResponse = Either<
  ResourceNotFoundError,
  { course: Course }
>;

export class FetchCourseBySlugUsecase {
  constructor(private coursesRepository: CoursesRepository) {}

  async exec({
    slug,
  }: FetchCourseBySlugUsecaseRequest): Promise<FetchCourseBySlugResponse> {
    const course = await this.coursesRepository.findBySlug(slug);
    if (!course) return left(new ResourceNotFoundError());

    return right({ course });
  }
}
