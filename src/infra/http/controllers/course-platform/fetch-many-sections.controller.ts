import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { SectionPresenter } from '../../presenters/section.presenter';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import { FetchManySectionsUsecase } from '@/domain/course-platform/application/use-cases/fetch-many-sections.usecase';
import { HttpError } from '../error/http.error';
import { Roles } from '@/infra/decorators/roles.decorator';
import { UserRole } from '@/domain/user-system/entities/enums/roles.enum';

const fetchSectionQuerySchema = z.object({
  order: z.enum(['ASC', 'DESC']).default('ASC'),
  title: z.string().default(''),
  page: z.coerce.number().default(1),
});

type FetchSectionQuerySchema = z.infer<typeof fetchSectionQuerySchema>;
const validationPipe = new ZodValidationPipe(fetchSectionQuerySchema);

@Controller('/section')
export class fetchManySectionsController {
  constructor(private fetchSections: FetchManySectionsUsecase) {}

  @Get()
  @Roles(UserRole.Admin, UserRole.CourseOwner)
  async exec(@Query(validationPipe) {}: FetchSectionQuerySchema) {
    const result = await this.fetchSections.exec({});
    if (result.isLeft()) {
      throw new HttpError({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          'Oops! um erro inesperado aconteceu, por favor entre em contato com a nossa equipe',
      });
    }

    return { sections: result.value.sections.map(SectionPresenter.toHTTP) };
  }
}
