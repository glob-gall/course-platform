import { Module } from '@nestjs/common';

// import { UsersRepository } from '@/domain/user-system/application/repositories/users.repository';
import { createUserController } from './controllers/user/create-user..controller';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { DatabaseModule } from '../database/database.module';
import { CreateUserUsecase } from '@/domain/user-system/application/use-cases/create-user.usecase';
import { AuthenticateUserUsecase } from '@/domain/user-system/application/use-cases/authenticate-user.usecase';
import { SignInController } from '../http/controllers/auth/sign-in.controller';
import { AuthModule } from '../auth/auth.module';
import { fetchCourseByIdController } from './controllers/course-platform/fetch-course-by-id.controller';
import { fetchManyCoursesController } from './controllers/course-platform/fetch-many-courses.controller';
import { FetchCourseByIdUsecase } from '@/domain/course-platform/application/use-cases/fetch-course-by-id.usecase';
import { FetchManyCoursesUsecase } from '@/domain/course-platform/application/use-cases/fetch-many-courses.usecase';
import { createCourseController } from './controllers/course-platform/create-course.controller';
import { CreateCourseUsecase } from '@/domain/course-platform/application/use-cases/create-course.usecase';
import { CreateSectionUsecase } from '@/domain/course-platform/application/use-cases/create-section.usecase';
import { createSectionController } from './controllers/course-platform/create-section.controller';
import { fetchManySectionsController } from './controllers/course-platform/fetch-many-sections.controller';
import { FetchManySectionsUsecase } from '@/domain/course-platform/application/use-cases/fetch-many-sections.usecase';
import { editSectionController } from './controllers/course-platform/edit-section.controller';
import { EditSectionUsecase } from '@/domain/course-platform/application/use-cases/edit-section.usecase';
import { CreateSectionLectureUsecase } from '@/domain/course-platform/application/use-cases/create-section-lecture.usecase';
import { createSectionLectureController } from './controllers/course-platform/create-section-lecture.controller';
import { fetchManyLecturesController } from './controllers/lecture-system/fetch-many-lectures.controller';
import { FetchManyLectureUsecase } from '@/domain/lecture-system/application/use-cases/fetch-many-lectures.usecase';
import { FetchManyQuizzesUsecase } from '@/domain/quizz-system/application/use-cases/fetch-many-quizz.usecase';
import { fetchManyQuizzesController } from './controllers/quizz-system/fetch-many-quizzes.controller';
import { createSectionQuizzController } from './controllers/course-platform/create-section-quizz.controller';
import { CreateSectionQuizzUsecase } from '@/domain/course-platform/application/use-cases/create-section-quizz.usecase';
import { fetchManyQuestionsController } from './controllers/quizz-system/fetch-many-questions.controller';
import { FetchManyQuestionsUsecase } from '@/domain/quizz-system/application/use-cases/fetch-many-question.usecase';
import { createQuestionController } from './controllers/quizz-system/create-question.controller';
import { CreateQuestionUsecase } from '@/domain/quizz-system/application/use-cases/create-question.usecase';

@Module({
  imports: [DatabaseModule, CryptographyModule, AuthModule],
  providers: [
    CreateUserUsecase,
    AuthenticateUserUsecase,
    FetchCourseByIdUsecase,
    FetchManyCoursesUsecase,
    CreateCourseUsecase,
    CreateSectionUsecase,
    FetchManySectionsUsecase,
    EditSectionUsecase,
    CreateSectionLectureUsecase,
    FetchManyLectureUsecase,
    FetchManyQuizzesUsecase,
    CreateSectionQuizzUsecase,
    FetchManyQuestionsUsecase,
    CreateQuestionUsecase,
  ],
  controllers: [
    createUserController,
    SignInController,
    fetchCourseByIdController,
    fetchManyCoursesController,
    createCourseController,
    createSectionController,
    fetchManySectionsController,
    editSectionController,
    createSectionLectureController,
    fetchManyLecturesController,
    fetchManyQuizzesController,
    createSectionQuizzController,
    fetchManyQuestionsController,
    createQuestionController,
  ],
})
export class HttpModule {}
