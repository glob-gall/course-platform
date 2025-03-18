import { Either, left, right } from '@/core/types/either';
import { SectionQuizz } from '../../entities/section-quizz.entity';
import { SectionQuizzesRepository } from '../repositories/section-quizzes.repository';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { SectionsRepository } from '../repositories/sections.repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { QuizzesRepository } from '@/domain/quizz-system/application/repositories/quizzes.repository';
import { Quizz } from '@/domain/quizz-system/entities/quizz.entity';
import { Injectable } from '@nestjs/common';

interface CreateSectionQuizzUsecaseRequest {
  sectionId: string;
  title: string;
  description: string;
  quizzDescription: string;
  quizzTitle: string;
}

type CreateSectionQuizzResponse = Either<
  ResourceNotFoundError,
  { sectionQuizz: SectionQuizz }
>;

@Injectable()
export class CreateSectionQuizzUsecase {
  constructor(
    private quizzsRepository: QuizzesRepository,
    private sectionsRepository: SectionsRepository,
    private sectionquizzsRepository: SectionQuizzesRepository,
  ) {}

  async exec({
    sectionId,
    title,
    description,
    quizzDescription,
    quizzTitle,
  }: CreateSectionQuizzUsecaseRequest): Promise<CreateSectionQuizzResponse> {
    const section = await this.sectionsRepository.findById(sectionId);

    if (!section) return left(new ResourceNotFoundError());

    const quizz = Quizz.create({
      description: quizzDescription,
      title: quizzTitle,
      questions: [],
    });

    await this.quizzsRepository.create(quizz);

    const sectionQuizz = SectionQuizz.create({
      description,
      quizzId: quizz.id,
      sectionId: new UniqueEntityID(sectionId),
      title,
    });
    await this.sectionquizzsRepository.create(sectionQuizz);

    return right({ sectionQuizz });
  }
}
