import { PaginationParams } from '@/core/repositories/pagination-params';
import { Course } from '../../entities/course.entity';
import { CourseFilters } from './filters/course.filter';

export abstract class CoursesRepository {
  abstract create(course: Course): Promise<void>;
  abstract save(course: Course): Promise<void>;
  abstract delete(course: Course): Promise<void>;
  abstract findById(id: string): Promise<Course | null>;
  abstract findBySlug(slug: string): Promise<Course | null>;
  abstract findMany(
    filters: CourseFilters,
    pageParams: PaginationParams,
  ): Promise<Course[]>;

  abstract findManyByIds(ids: string[]): Promise<Course[]>;
}
