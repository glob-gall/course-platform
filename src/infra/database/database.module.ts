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
      provide: SectionQuizzesRepository,
      useClass: PrismaSectionQuizzesRepository,
    },
    {
      provide: SectionLecturesRepository,
      useClass: PrismaSectionLecturesRepository,
    },
  ],
  exports: [
    PrismaService,
    UsersRepository,
    CoursesRepository,
    SectionQuizzesRepository,
    SectionLecturesRepository,
  ],
})
export class DatabaseModule {}
