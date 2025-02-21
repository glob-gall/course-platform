import { Either, left, right } from '@/core/types/either';
import { SectionsRepository } from '../repositories/sections.repository';
import { ResourceNotFoundError } from './errors/resource-not-found.error';

interface DeleteSectionUsecaseRequest {
  id: string;
}

type DeleteSectionResponse = Either<ResourceNotFoundError, null>;

export class DeleteSectionUsecase {
  constructor(private sectionsRepository: SectionsRepository) {}

  async exec({
    id,
  }: DeleteSectionUsecaseRequest): Promise<DeleteSectionResponse> {
    const section = await this.sectionsRepository.findById(id);
    if (!section) return left(new ResourceNotFoundError());

    await this.sectionsRepository.delete(section);

    return right(null);
  }
}
