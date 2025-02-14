import { Either, left, right } from '@/core/types/either';
import { Section } from '../../entities/section.entity';
import { SectionsRepository } from '../repositories/sections.repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';

interface EditSectionUsecaseRequest {
  id: string;
  description: string;
  title: string;
}

type EditSectionResponse = Either<ResourceNotFoundError, { section: Section }>;

export class EditSectionUsecase {
  constructor(private sectionsRepository: SectionsRepository) {}

  async exec({
    id,
    description,
    title,
  }: EditSectionUsecaseRequest): Promise<EditSectionResponse> {
    const section = await this.sectionsRepository.findById(id);

    if (!section) return left(new ResourceNotFoundError());

    section.description = description;
    section.title = title;

    await this.sectionsRepository.save(section);

    return right({ section });
  }
}
