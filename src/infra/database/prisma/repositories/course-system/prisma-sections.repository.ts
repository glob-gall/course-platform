import { SectionsRepository } from '@/domain/course-platform/application/repositories/sections.repository';
import { PrismaService } from '../../prisma.service';
import { Section } from '@/domain/course-platform/entities/section.entity';
import { PrismaSectionMapper } from '../../mappers/prisma-section.mapper';

export class PrismaSectionRepository implements SectionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(section: Section): Promise<void> {
    const data = PrismaSectionMapper.toPrisma(section);
    await this.prisma.section.create({
      data,
    });
  }

  async save(section: Section): Promise<void> {
    const data = PrismaSectionMapper.toPrisma(section);

    await this.prisma.section.update({
      where: {
        id: section.id.toString(),
      },
      data,
    });
  }

  async delete(section: Section): Promise<void> {
    await this.prisma.section.delete({
      where: { id: section.id.toString() },
    });
  }

  async findById(id: string): Promise<Section | null> {
    const section = await this.prisma.section.findUnique({
      where: { id },
    });
    if (!section) return null;
    return PrismaSectionMapper.toDomain(section);
  }

  async findSectiosByCourseId(courseId: string): Promise<Section[]> {
    const sections = await this.prisma.section.findMany({
      where: { courseId },
    });
    return sections.map(PrismaSectionMapper.toDomain);
  }
}
