import { PrismaService } from '../../prisma.service';
import { Injectable } from '@nestjs/common';
import { AnswersRepository } from '@/domain/quizz-system/application/repositories/answers.repository';
import { Answer } from '@/domain/quizz-system/entities/answer.entity';
import { PrismaAnswerMapper } from '../../mappers/prisma-answer.mapper';

@Injectable()
export class PrismaAnswersRepository implements AnswersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMany(answers: Answer[]): Promise<void> {
    const prismaAnswers = answers.map(PrismaAnswerMapper.toPrisma)
    await this.prisma.answer.createMany({
      data: prismaAnswers
    })
  }
  async deleteManyByQuestionId(questionId: string): Promise<void> {
    await this.prisma.answer.deleteMany({
      where:{
        questionId
      }
    })
  }

}
