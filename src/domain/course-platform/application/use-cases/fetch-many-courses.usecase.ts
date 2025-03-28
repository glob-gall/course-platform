import { Either, right } from '@/core/types/either';
import { CoursesRepository } from '../repositories/courses.repository';
import { Course } from '../../entities/course.entity';
import { Injectable } from '@nestjs/common';
// import { CourseOrder } from '../repositories/filters/course.filter';

interface FetchManyCoursesUsecaseRequest {
  title?: string;
  page: number;
  // order: CourseOrder;
}

type FetchManyCoursesResponse = Either<null, { courses: Course[] }>;

@Injectable()
export class FetchManyCoursesUsecase {
  constructor(private coursesRepository: CoursesRepository) {}

  async exec({
    title,
    page,
  }: FetchManyCoursesUsecaseRequest): Promise<FetchManyCoursesResponse> {
    const courses = await this.coursesRepository.findMany({ title }, { page });

    return right({ courses });
  }
}
