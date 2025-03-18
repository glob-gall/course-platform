import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { CoursePresenter } from '../../presenters/course.presenter';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { FetchManyCoursesUsecase } from '@/domain/course-platform/application/use-cases/fetch-many-courses.usecase';
import { Order } from '@/core/repositories/filters';
import { HttpError } from '../error/http.error';
import { Roles } from '@/infra/decorators/roles.decorator';
import { UserRole } from '@/domain/user-system/entities/enums/roles.enum';

const fetchCourseQuerySchema = z.object({
  order: z.enum(['ASC', 'DESC']).default('ASC'),
  title: z.string().default(''),
  page: z.coerce.number().default(1),
});

type FetchCourseQuerySchema = z.infer<typeof fetchCourseQuerySchema>;
const validationPipe = new ZodValidationPipe(fetchCourseQuerySchema);

@Controller('/course')
export class fetchManyCoursesController {
  constructor(private fetchCourses: FetchManyCoursesUsecase) {}

  @Get()
  @Roles(UserRole.Admin, UserRole.CourseOwner)
  async exec(
    @Query(validationPipe) { page, order, title }: FetchCourseQuerySchema,
  ) {
    const result = await this.fetchCourses.exec({
      order: Order[order],
      page,
      title,
    });
    if (result.isLeft()) {
      throw new HttpError({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          'Oops! um erro inesperado aconteceu, por favor entre em contato com a nossa equipe',
      });
    }

    return { courses: result.value.courses.map(CoursePresenter.toHTTP) };
  }
}
