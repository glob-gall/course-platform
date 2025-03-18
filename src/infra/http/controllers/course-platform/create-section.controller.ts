import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { SectionPresenter } from '../../presenters/section.presenter';
import { HttpError } from '../error/http.error';
import { z } from 'zod';
import { CreateSectionUsecase } from '@/domain/course-platform/application/use-cases/create-section.usecase';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { Roles } from '@/infra/decorators/roles.decorator';
import { UserRole } from '@/domain/user-system/entities/enums/roles.enum';

const createSectionBodySchema = z.object({
  description: z.string(),
  title: z.string().min(8),
  courseId: z.string().nonempty(),
});
type CreateSectionBodySchema = z.infer<typeof createSectionBodySchema>;
const createSectionValidationPipe = new ZodValidationPipe(
  createSectionBodySchema,
);

@Controller('/section')
export class createSectionController {
  constructor(private createSection: CreateSectionUsecase) {}

  @Post()
  @Roles(UserRole.CourseOwner, UserRole.Admin)
  async exec(
    @Body(createSectionValidationPipe)
    { description, courseId, title }: CreateSectionBodySchema,
  ) {
    const result = await this.createSection.exec({
      description,
      title,
      courseId,
    });

    if (result.isLeft()) {
      throw new HttpError({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          'Oops! um erro inesperado aconteceu, por favor entre em contato com a nossa equipe',
      });
    }

    return { section: SectionPresenter.toHTTP(result.value.section) };
  }
}
