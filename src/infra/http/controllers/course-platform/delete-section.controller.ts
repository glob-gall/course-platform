import { Controller, Delete, HttpStatus, Param } from '@nestjs/common';
import { HttpError } from '../error/http.error';
import { Roles } from '@/infra/decorators/roles.decorator';
import { UserRole } from '@/domain/user-system/entities/enums/roles.enum';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { DeleteSectionUsecase } from '@/domain/course-platform/application/use-cases/delete-section.usecase';

@Controller('/section/:sectionId')
export class deleteSectionController {
  constructor(private deleteSection: DeleteSectionUsecase) {}

  @Delete()
  @Roles(UserRole.CourseOwner, UserRole.Admin)
  async exec(@Param('sectionId') sectionId: string) {
    const result = await this.deleteSection.exec({
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
  }
}
