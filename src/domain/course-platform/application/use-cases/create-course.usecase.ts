import { Either, right } from '@/core/types/either';
import { Course } from '../../entities/course.entity';
import { CoursesRepository } from '../repositories/courses.repository';
import { Slug } from '@/core/entities/value-objects/slug';

interface CreateCourseUsecaseRequest {
  description: string;
  title: string;
  slug?: string;
}

type CreateCourseResponse = Either<null, { course: Course }>;

export class CreateCourseUsecase {
  constructor(private coursesRepository: CoursesRepository) {}

  async exec({
    description,
    title,
    slug,
  }: CreateCourseUsecaseRequest): Promise<CreateCourseResponse> {
    const course = Course.create({
      description,
      title,
      slug: slug ? Slug.create(slug) : Slug.createFromText(title),
    });
    await this.coursesRepository.create(course);

    return right({ course });
  }
}
