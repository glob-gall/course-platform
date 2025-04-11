import { Either, left, right } from '@/core/types/either';
import { Section } from '../../entities/section.entity';
import { SectionsRepository } from '../repositories/sections.repository';
import { Injectable } from '@nestjs/common';
import { CoursesRepository } from '../repositories/courses.repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';

interface CreateSectionUsecaseRequest {
  description: string;
  title: string;
  courseId: string;
}

type CreateSectionResponse = Either<
  ResourceNotFoundError,
  { section: Section }
>;

@Injectable()
export class CreateSectionUsecase {
  constructor(
    private sectionsRepository: SectionsRepository,
    private coursesRepository: CoursesRepository,
  ) {}

  async exec({
    description,
    courseId,
    title,
  }: CreateSectionUsecaseRequest): Promise<CreateSectionResponse> {
    const course = await this.coursesRepository.findById(courseId);
    if (!course) return left(new ResourceNotFoundError());

    const section = Section.create({
      description,
      course,
      items: [],
      title,
    });
    await this.sectionsRepository.create(section);

    return right({ section });
  }
}
