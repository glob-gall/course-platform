import { SectionQuizz } from '@/domain/course-platform/entities/section-quizz.entity';
import { PrismaService } from '../../prisma.service';
import { PrismaSectionQuizzMapper } from '../../mappers/prisma-section-quizz.mapper';
import { SectionQuizzesRepository } from '@/domain/course-platform/application/repositories/section-quizzes.repository';

export class PrismaSectionQuizzRepository implements SectionQuizzesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(sectionquizz: SectionQuizz): Promise<void> {
    const data = PrismaSectionQuizzMapper.toPrisma(sectionquizz);
    await this.prisma.sectionItem.create({
      data,
    });
  }

  async save(sectionquizz: SectionQuizz): Promise<void> {
    const data = PrismaSectionQuizzMapper.toPrisma(sectionquizz);

    await this.prisma.sectionItem.update({
      where: {
        id: sectionquizz.id.toString(),
      },
      data,
    });
  }

  async delete(sectionquizz: SectionQuizz): Promise<void> {
    await this.prisma.sectionItem.delete({
      where: { id: sectionquizz.id.toString() },
    });
  }
}
