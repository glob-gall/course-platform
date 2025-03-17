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

@Module({
  imports: [DatabaseModule, CryptographyModule, AuthModule],
  providers: [CreateUserUsecase, AuthenticateUserUsecase, FetchCourseByIdUsecase, FetchManyCoursesUsecase, CreateCourseUsecase, CreateSectionUsecase, FetchManySectionsUsecase ],
  controllers: [createUserController, SignInController, fetchCourseByIdController, fetchManyCoursesController, createCourseController, createSectionController, fetchManySectionsController],
})
export class HttpModule {}
