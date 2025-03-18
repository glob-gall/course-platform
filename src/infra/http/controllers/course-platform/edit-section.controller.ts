import { Body, Controller, HttpStatus, Param, Put } from '@nestjs/common';
import { SectionPresenter } from '../../presenters/section.presenter';
import { HttpError } from '../error/http.error';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { Roles } from '@/infra/decorators/roles.decorator';
import { UserRole } from '@/domain/user-system/entities/enums/roles.enum';
import { EditSectionUsecase } from '@/domain/course-platform/application/use-cases/edit-section.usecase';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';

const editSectionBodySchema = z.object({
  description: z.string(),
  title: z.string().min(8),
});
type EditSectionBodySchema = z.infer<typeof editSectionBodySchema>;
const editSectionValidationPipe = new ZodValidationPipe(editSectionBodySchema);

@Controller('/section/:sectionId')
export class editSectionController {
  constructor(private editSection: EditSectionUsecase) {}

  @Put()
  @Roles(UserRole.CourseOwner, UserRole.Admin)
  async exec(
    @Param('sectionId') sectionId: string,
    @Body(editSectionValidationPipe)
    { description, title }: EditSectionBodySchema,
  ) {
    const result = await this.editSection.exec({
      description,
      title,
      id: sectionId,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new HttpError({
            code: HttpStatus.CONFLICT,
            message: 'Módulo não encontrado.',
          });

        default:
          throw new HttpError({
            code: HttpStatus.INTERNAL_SERVER_ERROR,
            message:
              'Oops! um erro inesperado aconteceu, por favor entre em contato com a nossa equipe',
          });
      }
    }

    return { section: SectionPresenter.toHTTP(result.value.section) };
  }
}
