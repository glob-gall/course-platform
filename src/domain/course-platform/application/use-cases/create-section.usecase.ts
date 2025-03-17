import { Either, right } from '@/core/types/either';
import { Section } from '../../entities/section.entity';
import { SectionsRepository } from '../repositories/sections.repository';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Injectable } from '@nestjs/common';

interface CreateSectionUsecaseRequest {
  description: string;
  title: string;
  courseId: string;
}

type CreateSectionResponse = Either<null, { section: Section }>;

@Injectable()
export class CreateSectionUsecase {
  constructor(private sectionsRepository: SectionsRepository) {}

  async exec({
    description,
    courseId,
    title,
  }: CreateSectionUsecaseRequest): Promise<CreateSectionResponse> {
    const section = Section.create({
      description,
      courseId: new UniqueEntityID(courseId),
      title,
    });
    await this.sectionsRepository.create(section);

    return right({ section });
  }
}
