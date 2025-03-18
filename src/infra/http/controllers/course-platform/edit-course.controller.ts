import { Body, Controller, HttpStatus, Param, Put } from '@nestjs/common';
import { CoursePresenter } from '../../presenters/course.presenter';
import { HttpError } from '../error/http.error';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { Roles } from '@/infra/decorators/roles.decorator';
import { UserRole } from '@/domain/user-system/entities/enums/roles.enum';
import { EditCourseUsecase } from '@/domain/course-platform/application/use-cases/edit-course.usecase';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';

const editcourseBodySchema = z.object({
  description: z.string(),
  slug: z.string(),
  title: z.string().min(8),
});
type EditcourseBodySchema = z.infer<typeof editcourseBodySchema>;
const editcourseValidationPipe = new ZodValidationPipe(editcourseBodySchema);

@Controller('/course/:courseId')
export class editcourseController {
  constructor(private editcourse: EditCourseUsecase) {}

  @Put()
  @Roles(UserRole.CourseOwner, UserRole.Admin)
  async exec(
    @Param('courseId') courseId: string,
    @Body(editcourseValidationPipe)
    { description, title, slug }: EditcourseBodySchema,
  ) {
    const result = await this.editcourse.exec({
      description,
      title,
      slug,
      id: courseId,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new HttpError({
            code: HttpStatus.CONFLICT,
            message: 'Curso não encontrado.',
          });

        default:
          throw new HttpError({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message:
              'Oops! um erro inesperado aconteceu, por favor entre em contato com a nossa equipe',
          });
      }
    }

    return { course: CoursePresenter.toHTTP(result.value.course) };
  }
}
