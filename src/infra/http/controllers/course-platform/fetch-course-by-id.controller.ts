import { FetchCourseByIdUsecase } from '@/domain/course-platform/application/use-cases/fetch-course-by-id.usecase';
import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { CoursePresenter } from '../../presenters/course.presenter';
import { HttpError } from '../error/http.error';

@Controller('/course/:courseId')
export class fetchCourseByIdController {
  constructor(private fetchCourse: FetchCourseByIdUsecase) {}

  @Get()
  async exec(@Param('courseId') courseId: string) {
    const response = await this.fetchCourse.exec({ id: courseId });
    if (response.isLeft()) {
      throw new HttpError({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          'Oops! um erro inesperado aconteceu, por favor entre em contato com a nossa equipe',
      });
    }
    return { course: CoursePresenter.toHTTP(response.value.course) };
  }
}
