import { Either, left, right } from '@/core/types/either';
import { Course } from '../../entities/course.entity';
import { CoursesRepository } from '../repositories/courses.repository';
import { Slug } from '@/core/entities/value-objects/slug';
import { Injectable } from '@nestjs/common';
import { SlugAlreadyInUseError } from './errors/slug-in-use.error';

interface CreateCourseUsecaseRequest {
  description: string;
  title: string;
  slug?: string;
}

type CreateCourseResponse = Either<SlugAlreadyInUseError, { course: Course }>;

@Injectable()
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
      sections: [],
      slug: slug ? Slug.create(slug) : Slug.createFromText(title),
    });
    const courseWithSameSlug = await this.coursesRepository.findBySlug(
      course.slug.value,
    );
    if (courseWithSameSlug) return left(new SlugAlreadyInUseError());

    await this.coursesRepository.create(course);

    return right({ course });
  }
}
