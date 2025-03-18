import { PrismaService } from '../../prisma.service';
import { LecturesRepository } from '@/domain/lecture-system/application/repositories/lectures.repository';
import { Injectable } from '@nestjs/common';
import { Lecture } from '@/domain/lecture-system/entities/lecture.entity';
import { PrismaLectureMapper } from '../../mappers/prisma-lecture.mapper';

@Injectable()
export class PrismaLecturesRepository implements LecturesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(): Promise<Lecture[]> {
    const lectures = await this.prisma.lecture.findMany();
    return lectures.map(PrismaLectureMapper.toDomain);
  }

  async create(lecture: Lecture): Promise<void> {
    const data = PrismaLectureMapper.toPrisma(lecture);
    await this.prisma.lecture.create({
      data,
    });
  }

  async save(lecture: Lecture): Promise<void> {
    const data = PrismaLectureMapper.toPrisma(lecture);
    await this.prisma.lecture.update({
      data,
      where: {
        id: data.id,
      },
    });
  }

  async delete(lecture: Lecture): Promise<void> {
    await this.prisma.lecture.delete({
      where: {
        id: lecture.id.toString(),
      },
    });
  }

  async findById(id: string): Promise<Lecture | null> {
    const lecture = await this.prisma.lecture.findUnique({
      where: {
        id: id,
      },
    });
    if (!lecture) return null;

    return PrismaLectureMapper.toDomain(lecture);
  }
}
