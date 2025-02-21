import { Either, left, right } from '@/core/types/either';
import { Course } from '../../entities/course.entity';
import { CoursesRepository } from '../repositories/courses.repository';
import { Slug } from '@/core/entities/value-objects/slug';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';

interface EditCourseUsecaseRequest {
  id: string;
  description: string;
  title: string;
  slug: string;
}

type EditCourseResponse = Either<ResourceNotFoundError, { course: Course }>;

export class EditCourseUsecase {
  constructor(private coursesRepository: CoursesRepository) {}

  async exec({
    id,
    description,
    title,
    slug,
  }: EditCourseUsecaseRequest): Promise<EditCourseResponse> {
    const course = await this.coursesRepository.findById(id);
    if (!course) return left(new ResourceNotFoundError());

    course.description = description;
    course.title = title;
    course.slug = Slug.create(slug);

    await this.coursesRepository.save(course);

    return right({ course });
  }
}
