import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { HttpError } from '../error/http.error';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { Roles } from '@/infra/decorators/roles.decorator';
import { UserRole } from '@/domain/user-system/entities/enums/roles.enum';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { CreateSectionQuizzUsecase } from '@/domain/course-platform/application/use-cases/create-section-quizz.usecase';
import { SectionQuizzPresenter } from '../../presenters/section-quizz.presenter';

const createQuizzBodySchema = z.object({
  description: z.string(),
  title: z.string().min(8),
  sectionId: z.string(),
  quizzTitle: z.string(),
  quizzDescription: z.string(),
});

type CreateQuizzBodySchema = z.infer<typeof createQuizzBodySchema>;
const createQuizzValidationPipe = new ZodValidationPipe(createQuizzBodySchema);

@Controller('/section-quizz')
export class createSectionQuizzController {
  constructor(private createQuizz: CreateSectionQuizzUsecase) {}

  @Post()
  @Roles(UserRole.CourseOwner, UserRole.Admin)
  async exec(
    @Body(createQuizzValidationPipe)
    {
      description,
      title,
      quizzDescription,
      quizzTitle,
      sectionId,
    }: CreateQuizzBodySchema,
  ) {
    const result = await this.createQuizz.exec({
      description,
      title,
      quizzDescription,
      quizzTitle,
      sectionId,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new HttpError({
            code: HttpStatus.CONFLICT,
            message: 'Módulo não encontrada.',
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
      sectionquizz: SectionQuizzPresenter.toHTTP(result.value.sectionQuizz),
    };
  }
}
