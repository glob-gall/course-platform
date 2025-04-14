import { Body, Controller, HttpStatus, Post, Param } from '@nestjs/common';
import { HttpError } from '../error/http.error';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { Roles } from '@/infra/decorators/roles.decorator';
import { UserRole } from '@/domain/user-system/entities/enums/roles.enum';
import { ISaveUserCourseProgressUsecase } from '@/domain/progress-system/application/use-cases/save-user-course-progress.usecase';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { TokenPayload } from '@/infra/auth/guards/role.guard';

const saveUserCourseProgressBodySchema = z.object({
  concluded: z.boolean(),
});
type SaveUserCourseProgressBodySchema = z.infer<
  typeof saveUserCourseProgressBodySchema
>;
const saveUserCourseProgressValidationPipe = new ZodValidationPipe(
  saveUserCourseProgressBodySchema,
);

@Controller('/course/:courseId/:sectionItemId')
export class saveUserCourseProgressController {
  constructor(private saveUserCourseProgress: ISaveUserCourseProgressUsecase) {}

  @Post()
  @Roles(UserRole.CourseOwner, UserRole.Admin, UserRole.Student)
  async post(
    @Param('courseId') courseId: string,
    @Param('sectionItemId') sectionItemId: string,
    @CurrentUser() user: TokenPayload,
    @Body(saveUserCourseProgressValidationPipe)
    { concluded }: SaveUserCourseProgressBodySchema,
  ) {
    const result = await this.saveUserCourseProgress.exec({
      concluded,
      courseId,
      sectionItemId,
      userId: user.sub,
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
