import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersRepository } from '@/domain/user-system/application/repositories/users.repository';
import { PrismaUsersRepository } from './prisma/repositories/user-system/prisma-users.repository';
import { CoursesRepository } from '@/domain/course-platform/application/repositories/courses.repository';
import { PrismaCoursesRepository } from './prisma/repositories/course-system/prisma-courses.repository';
import { PrismaSectionQuizzesRepository } from './prisma/repositories/course-system/prisma-section-quizzes.repository';
import { SectionQuizzesRepository } from '@/domain/course-platform/application/repositories/section-quizzes.repository';
import { SectionLecturesRepository } from '@/domain/course-platform/application/repositories/section-lectures.repository';
import { PrismaSectionLecturesRepository } from './prisma/repositories/course-system/prisma-section-lectures.repository';
import { SectionsRepository } from '@/domain/course-platform/application/repositories/sections.repository';
import { PrismaSectionsRepository } from './prisma/repositories/course-system/prisma-sections.repository';
import { PrismaLecturesRepository } from './prisma/repositories/course-system/prisma-lectures.repository';
import { LecturesRepository } from '@/domain/lecture-system/application/repositories/lectures.repository';
import { QuizzesRepository } from '@/domain/quizz-system/application/repositories/quizzes.repository';
import { PrismaQuizzesRepository } from './prisma/repositories/course-system/prisma-quizzes.repository';
import { QuestionsRepository } from '@/domain/quizz-system/application/repositories/questions.repository';
import { PrismaQuestionsRepository } from './prisma/repositories/course-system/prisma-questions.repository';
import { PrismaAnswersRepository } from './prisma/repositories/course-system/prisma-answers.repository';
import { AnswersRepository } from '@/domain/quizz-system/application/repositories/answers.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: CoursesRepository,
      useClass: PrismaCoursesRepository,
    },
    {
      provide: LecturesRepository,
      useClass: PrismaLecturesRepository,
    },
    {
      provide: QuizzesRepository,
      useClass: PrismaQuizzesRepository,
    },
    {
      provide: SectionsRepository,
      useClass: PrismaSectionsRepository,
    },
    {
      provide: SectionQuizzesRepository,
      useClass: PrismaSectionQuizzesRepository,
    },
    {
      provide: SectionLecturesRepository,
      useClass: PrismaSectionLecturesRepository,
    },
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: AnswersRepository,
      useClass: PrismaAnswersRepository,
    },
  ],
  exports: [
    PrismaService,
    UsersRepository,
    CoursesRepository,
    SectionsRepository,
    SectionQuizzesRepository,
    SectionLecturesRepository,
    LecturesRepository,
    QuizzesRepository,
    QuestionsRepository,
    AnswersRepository,
  ],
})
export class DatabaseModule {}
