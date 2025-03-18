import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { HttpError } from '../error/http.error';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { Roles } from '@/infra/decorators/roles.decorator';
import { UserRole } from '@/domain/user-system/entities/enums/roles.enum';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { CreateSectionLectureUsecase } from '@/domain/course-platform/application/use-cases/create-section-lecture.usecase';
import { SectionLecturePresenter } from '../../presenters/section-lecture.presenter';

const createLectureBodySchema = z.object({
  description: z.string(),
  title: z.string().min(8),
  lectureDescription: z.string(),
  lectureTitle: z.string(),
  sectionId: z.string(),
  lectureAudioURL: z.string().optional(),
  lectureExternalResource: z.string().optional(),
  lectureVideoURL: z.string().optional(),
});
type CreateLectureBodySchema = z.infer<typeof createLectureBodySchema>;
const createLectureValidationPipe = new ZodValidationPipe(
  createLectureBodySchema,
);

@Controller('/section-lecture')
export class createSectionLectureController {
  constructor(private createLecture: CreateSectionLectureUsecase) {}

  @Post()
  @Roles(UserRole.CourseOwner, UserRole.Admin)
  async exec(
    @Body(createLectureValidationPipe)
    {
      description,
      title,
      lectureAudioURL,
      lectureDescription,
      lectureExternalResource,
      lectureTitle,
      lectureVideoURL,
      sectionId,
    }: CreateLectureBodySchema,
  ) {
    const result = await this.createLecture.exec({
      description,
      title,
      lectureDescription,
      lectureTitle,
      sectionId,
      lectureAudioURL,
      lectureExternalResource,
      lectureVideoURL,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new HttpError({
            code: HttpStatus.CONFLICT,
            message: 'Aula não encontrada.',
          });

        default:
          throw new HttpError({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message:
              'Oops! um erro inesperado aconteceu, por favor entre em contato com a nossa equipe',
          });
      }
    }

    return {
      sectionlecture: SectionLecturePresenter.toHTTP(
        result.value.sectionlecture,
      ),
    };
  }
}
