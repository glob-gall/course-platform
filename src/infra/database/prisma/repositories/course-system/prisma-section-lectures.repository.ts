import { SectionLecture } from '@/domain/course-platform/entities/section-lecture.entity';
import { PrismaService } from '../../prisma.service';
import { PrismaSectionLectureMapper } from '../../mappers/prisma-section-lecture.mapper';
import { SectionLecturesRepository } from '@/domain/course-platform/application/repositories/section-lectures.repository';

export class PrismaSectionLectureRepository
  implements SectionLecturesRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async create(sectionlecture: SectionLecture): Promise<void> {
    const data = PrismaSectionLectureMapper.toPrisma(sectionlecture);
    await this.prisma.sectionItem.create({
      data,
    });
  }

  async save(sectionlecture: SectionLecture): Promise<void> {
    const data = PrismaSectionLectureMapper.toPrisma(sectionlecture);

    await this.prisma.sectionItem.update({
      where: {
        id: sectionlecture.id.toString(),
      },
      data,
    });
  }

  async delete(sectionlecture: SectionLecture): Promise<void> {
    await this.prisma.sectionItem.delete({
      where: { id: sectionlecture.id.toString() },
    });
  }
}
