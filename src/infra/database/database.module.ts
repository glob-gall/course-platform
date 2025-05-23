import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersRepository } from '@/domain/user-system/application/repositories/users.repository';
import { PrismaUsersRepository } from './prisma/repositories/user-system/prisma-users.repository';
import { CoursesRepository } from '@/domain/course-platform/application/repositories/courses.repository';
import { PrismaCoursesRepository } from './prisma/repositories/course-system/prisma-courses.repository';
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
import { ProductsRepository } from '@/domain/product-system/application/repositories/products.repository';
import { PrismaProductsRepository } from './prisma/repositories/product-system/prisma-products.repository';
import { PurchasesRepository } from '@/domain/product-system/application/repositories/purchases.repository';
import { PrismaPurchasesRepository } from './prisma/repositories/product-system/prisma-purchases.repository';
import { SubscriptionsRepository } from '@/domain/product-system/application/repositories/subscriptions.repository';
import { PrismaSubscriptionsRepository } from './prisma/repositories/product-system/prisma-subscriptions.repository';

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
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: AnswersRepository,
      useClass: PrismaAnswersRepository,
    },
    {
      provide: ProductsRepository,
      useClass: PrismaProductsRepository,
    },
    {
      provide: PurchasesRepository,
      useClass: PrismaPurchasesRepository,
    },
    {
      provide: SubscriptionsRepository,
      useClass: PrismaSubscriptionsRepository,
    },
  ],
  exports: [
    PrismaService,
    UsersRepository,
    CoursesRepository,
    SectionsRepository,
    LecturesRepository,
    QuizzesRepository,
    QuestionsRepository,
    AnswersRepository,
    ProductsRepository,
    PurchasesRepository,
    SubscriptionsRepository,
  ],
})
export class DatabaseModule {}
