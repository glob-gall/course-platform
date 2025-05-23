import { CoursesRepository } from '@/domain/course-platform/application/repositories/courses.repository';
import { Course } from '@/domain/course-platform/entities/course.entity';
import { PrismaService } from '../../prisma.service';
import { PrismaCourseMapper } from '../../mappers/prisma-course.mapper';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { CourseFilters } from '@/domain/course-platform/application/repositories/filters/course.filter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaCoursesRepository implements CoursesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(course: Course): Promise<void> {
    const data = PrismaCourseMapper.toPrisma(course);

    await this.prisma.course.create({
      data,
    });
  }

  async save(course: Course): Promise<void> {
    const data = PrismaCourseMapper.toPrisma(course);

    await this.prisma.course.update({
      where: {
        id: course.id.toString(),
      },
      data,
    });
  }

  async delete(course: Course): Promise<void> {
    await this.prisma.course.delete({
      where: { id: course.id.toString() },
    });
  }

  async findById(id: string): Promise<Course | null> {
    const course = await this.prisma.course.findUnique({
      where: { id },
    });
    if (!course) return null;
    return PrismaCourseMapper.toDomain(course);
  }

  async findBySlug(slug: string): Promise<Course | null> {
    const course = await this.prisma.course.findUnique({
      where: { slug },
    });
    if (!course) return null;
    return PrismaCourseMapper.toDomain(course);
  }

  async findMany(
    { title }: CourseFilters,
    { page }: PaginationParams,
  ): Promise<Course[]> {
    const courses = await this.prisma.course.findMany({
      where: { title: { contains: title } },
      take: 20,
      skip: (page - 1) * 20,
    });

    return courses.map(PrismaCourseMapper.toDomain);
  }

  async findManyByIds(ids: string[]): Promise<Course[]> {
    const courses = await this.prisma.course.findMany({
      where: { id: { in: ids } },
    });

    return courses.map(PrismaCourseMapper.toDomain);
  }
}
