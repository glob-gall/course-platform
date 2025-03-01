import { FetchCourseByIdUsecase } from '@/domain/course-platform/application/use-cases/fetch-course-by-id.usecase';
import { Controller, Get, Param } from '@nestjs/common';
import { CoursePresenter } from '../../presenters/course.presenter';

// const fetchCourseBodySchema = z.object({
//   courseId: z.string(),
// });

// type FetchCourseBodySchema = z.infer<typeof fetchCourseBodySchema>;
// const validationPipe = new ZodValidationPipe(fetchCourseBodySchema);

@Controller()
export class AuthController {
  constructor(private fetchCourse: FetchCourseByIdUsecase) {}

  @Get('/course/:courseId')
  async siginIn(@Param('courseId') courseId: string) {
    const response = await this.fetchCourse.exec({ id: courseId });
    if (response.isLeft()) {
      throw response.value;
    }
    return { course: CoursePresenter.toHTTP(response.value.course) };
  }
}
