import { Either, right } from '@/core/types/either';
import { SectionsRepository } from '../repositories/sections.repository';
import { Section } from '../../entities/section.entity';

interface FetchSectionsByCourseIdUsecaseRequest {
  courseId: string;
}

type FetchSectionsByCourseIdResponse = Either<null, { sections: Section[] }>;

export class FetchSectionsByCourseIdUsecase {
  constructor(private sectionsRepository: SectionsRepository) {}

  async exec({
    courseId,
  }: FetchSectionsByCourseIdUsecaseRequest): Promise<FetchSectionsByCourseIdResponse> {
    const sections =
      await this.sectionsRepository.findSectiosByCourseId(courseId);

    return right({ sections });
  }
}
