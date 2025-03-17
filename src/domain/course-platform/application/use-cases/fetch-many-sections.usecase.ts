import { Either, right } from '@/core/types/either';
import { SectionsRepository } from '../repositories/sections.repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { Section } from '../../entities/section.entity';
import { Injectable } from '@nestjs/common';

interface FetchManySectionsUsecaseRequest {
  courseId?: string;
}

type FetchManySectionsResponse = Either<
  ResourceNotFoundError,
  { sections: Section[] }
>;

@Injectable()
export class FetchManySectionsUsecase {
  constructor(private sectionsRepository: SectionsRepository) {}

  async exec({}: FetchManySectionsUsecaseRequest): Promise<FetchManySectionsResponse> {
    const sections = await this.sectionsRepository.findMany();

    return right({ sections });
  }
}
