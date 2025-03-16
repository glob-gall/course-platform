import { Order } from '@/core/repositories/filters';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { CoursesRepository } from '@/domain/course-platform/application/repositories/courses.repository';
import { CourseFilters } from '@/domain/course-platform/application/repositories/filters/course.filter';
import { Course } from '@/domain/course-platform/entities/course.entity';

export class InMemoryCoursesRepository implements CoursesRepository {
  public items: Course[] = [];
  async create(course: Course): Promise<void> {
    this.items.push(course);
  }
  async save(course: Course): Promise<void> {
    const courseIndex = this.items.findIndex((item) => item.id === course.id);

    this.items[courseIndex] = course;
  }
  async delete(course: Course): Promise<void> {
    const courseIndex = this.items.findIndex((item) => item.id === course.id);
    this.items.splice(courseIndex, 1);
  }
  async findById(id: string): Promise<Course | null> {
    const course = this.items.find((item) => item.id.toString() === id);

    if (!course) return null;
    return course;
  }
  async findBySlug(slug: string): Promise<Course | null> {
    const course = this.items.find((item) => item.slug?.value === slug);

    if (!course) return null;
    return course;
  }

  async findMany(
    { order, title }: CourseFilters,
    { page }: PaginationParams,
  ): Promise<Course[]> {
    const courses = this.items.filter((item) => item.title.includes(title));
    if (order === Order.ASC)
      courses.sort((a, b) => +a.createdAt - +b.createdAt);
    else if (order === Order.DESC)
      courses.sort((a, b) => +b.createdAt - +a.createdAt);

    return courses.splice((page - 1) * 20, 20);
  }
}
