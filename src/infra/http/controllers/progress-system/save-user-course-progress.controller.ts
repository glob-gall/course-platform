import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { HttpError } from '../error/http.error';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { Roles } from '@/infra/decorators/roles.decorator';
import { UserRole } from '@/domain/user-system/entities/enums/roles.enum';
import { SaveUserCourseProgressUsecase } from '@/domain/progress-system/application/use-cases/save-user-course-progress.usecase';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';

const saveUserCourseProgressBodySchema = z.object({
  courseId: z.string(),
  sectionItemId: z.string(),
  userId: z.string(),
  concluded: z.boolean(),
});
type SaveUserCourseProgressBodySchema = z.infer<
  typeof saveUserCourseProgressBodySchema
>;
const saveUserCourseProgressValidationPipe = new ZodValidationPipe(
  saveUserCourseProgressBodySchema,
);

@Controller('/question')
export class saveUserCourseProgressController {
  constructor(private saveUserCourseProgress: SaveUserCourseProgressUsecase) {}

  @Post()
  @Roles(UserRole.CourseOwner, UserRole.Admin, UserRole.Student)
  async post(
    @Body(saveUserCourseProgressValidationPipe)
    {
      concluded,
      courseId,
      sectionItemId,
      userId,
    }: SaveUserCourseProgressBodySchema,
  ) {
    const result = await this.saveUserCourseProgress.exec({
      concluded,
      courseId,
      sectionItemId,
      userId,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new HttpError({
            code: HttpStatus.UNAUTHORIZED,
            message: 'User nas no access to this item',
          });

        default:
          throw new HttpError({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message:
              'Oops! um erro inesperado aconteceu, por favor entre em contato com a nossa equipe',
          });
      }
    }
  }
}
