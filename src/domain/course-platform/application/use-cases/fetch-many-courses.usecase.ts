import { Either, right } from '@/core/types/either';
import { CoursesRepository } from '../repositories/courses.repository';
import { Course } from '../../entities/course.entity';
import { Order } from '@/core/repositories/filters';

interface FetchManyCoursesUsecaseRequest {
  title: string;
  order: Order;
  page: number;
}

type FetchManyCoursesResponse = Either<null, { courses: Course[] }>;

export class FetchManyCoursesUsecase {
  constructor(private coursesRepository: CoursesRepository) {}

  async exec({
    title,
    order,
    page,
  }: FetchManyCoursesUsecaseRequest): Promise<FetchManyCoursesResponse> {
    const courses = await this.coursesRepository.findMany(
      { order, title },
      { page },
    );

    return right({ courses });
  }
}
