import { PrismaService } from '../../prisma.service';
import { Injectable } from '@nestjs/common';
import { Question } from '@/domain/quizz-system/entities/question.entity';
import { QuestionsRepository } from '@/domain/quizz-system/application/repositories/questions.repository';
import { PrismaQuestionMapper } from '../../mappers/prisma-question.mapper';

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(): Promise<Question[]> {
    const questions = await this.prisma.question.findMany({
      include: {
        answers: true,
      },
    });
    return questions.map(PrismaQuestionMapper.toDomain);
  }

  async create(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question);
    await this.prisma.question.create({
      data,
    });
    // const data = PrismaQuestionMapper.toPrisma(question);
    // const answers = question.answers.getNewItems().map(ans => PrismaAnswerMapper.toPrisma(ans))
    // await this.prisma.question.create({
    //   data:{
    //     ...data,
    //     answers:{
    //       createMany:{
    //         data:answers
    //       }
    //     }
    //   },

    // });
  }

  async save(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question);

    await this.prisma.question.update({
      data: {
        ...data,
      },
      where: {
        id: data.id,
      },
    });
  }

  async delete(question: Question): Promise<void> {
    await this.prisma.question.delete({
      where: {
        id: question.id.toString(),
      },
    });
  }

  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        id: id,
      },
      include: {
        answers: true,
      },
    });
    if (!question) return null;

    return PrismaQuestionMapper.toDomain(question);
  }
}
