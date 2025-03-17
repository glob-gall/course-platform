import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CoursePresenter } from '../../presenters/course.presenter';
import { HttpError } from '../error/http.error';
import { z } from 'zod';
import { CreateCourseUsecase } from '@/domain/course-platform/application/use-cases/create-course.usecase';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { Roles } from '@/infra/decorators/roles.decorator';
import { UserRole } from '@/domain/user-system/entities/enums/roles.enum';
import { SlugAlreadyInUseError } from '@/domain/course-platform/application/use-cases/errors/slug-in-use.error';

const createCourseBodySchema = z.object({
  description: z.string(),
  title: z.string().min(8),
  slug: z.string().optional(),
})
type CreateCourseBodySchema = z.infer<typeof createCourseBodySchema>
const createCourseValidationPipe = new ZodValidationPipe(
  createCourseBodySchema,
)

@Controller('/course')
export class createCourseController {
  constructor(private createCourse: CreateCourseUsecase) {}
  
  @Post()
  @Roles(UserRole.CourseOwner, UserRole.Admin)
  async exec(
    @Body(createCourseValidationPipe) {description,slug,title}:CreateCourseBodySchema 
  ) {
    
    const result = await this.createCourse.exec({ 
      description,
      title,
      slug
     });
     
    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case SlugAlreadyInUseError:
          throw new HttpError({
            code: HttpStatus.CONFLICT,
            message: 'Este slug já está em uso.',
          });
    
        default:
          throw new HttpError({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Oops! um erro inesperado aconteceu, por favor entre em contato com a nossa equipe',
          });
      }
    }
    
    return { course: CoursePresenter.toHTTP(result.value.course) };
  }
}
