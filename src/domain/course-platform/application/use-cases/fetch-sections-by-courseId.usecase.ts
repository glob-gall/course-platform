import { Either, right } from '@/core/types/either';
import { SectionsRepository } from '../repositories/sections.repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { Section } from '../../entities/section.entity';

interface FetchSectionsByCourseIdUsecaseRequest {
  courseId: string;
}

type FetchSectionsByCourseIdResponse = Either<
  ResourceNotFoundError,
  { sections: Section[] }
>;

export class FetchSectionsByCourseIdUsecase {
  constructor(private sectionsRepository: SectionsRepository) {}

  async exec({
    courseId,
  }: FetchSectionsByCourseIdUsecaseRequest): Promise<FetchSectionsByCourseIdResponse> {
    const sections =
      await this.sectionsRepository.findSectiosBySectionId(courseId);

    return right({ sections });
  }
}
