import { Course } from '../../entities/course.entity';

export abstract class CoursesRepository {
  abstract create(course: Course): Promise<void>;
  abstract save(course: Course): Promise<void>;
  abstract delete(course: Course): Promise<void>;
  abstract findById(id: string): Promise<Course | null>;
  abstract findBySlug(slug: string): Promise<Course | null>;
}
