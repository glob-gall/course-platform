import { Controller, Get, Query } from '@nestjs/common';
import { CoursePresenter } from '../../presenters/course.presenter';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { FetchManyCoursesUsecase } from '@/domain/course-platform/application/use-cases/fetch-many-courses.usecase';
import { Order } from '@/core/repositories/filters';

const fetchCourseQuerySchema = z.object({
  courseId: z.string(),
  order: z.enum(['ASC', 'DESC']),
  title: z.string(),
  page: z.coerce.number(),
});

type FetchCourseQuerySchema = z.infer<typeof fetchCourseQuerySchema>;
const validationPipe = new ZodValidationPipe(fetchCourseQuerySchema);

@Controller()
export class AuthController {
  constructor(private fetchCourses: FetchManyCoursesUsecase) {}

  @Get('/course/:courseId')
  async siginIn(
    @Query(validationPipe) { page, order, title }: FetchCourseQuerySchema,
  ) {
    const response = await this.fetchCourses.exec({
      order: Order[order],
      page,
      title,
    });
    if (response.isLeft()) {
      throw response.value;
    }
    return { courses: response.value.courses.map(CoursePresenter.toHTTP) };
  }
}
