import { Either, left, right } from '@/core/types/either';
import { Injectable } from '@nestjs/common';
import { UserCoursesRepository } from '../repositories/user-courses.repository';
import { UserCourse } from '../../entities/user-course.entity';
import { UserCourseAlreadyExistsError } from './errors/user-already-exists.error';
import { CoursesRepository } from '@/domain/course-platform/application/repositories/courses.repository';
import { UsersRepository } from '@/domain/user-system/application/repositories/users.repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';

export interface CreateUserCourseUsecaseRequest {
  userId: string;
  courseId: string;
}

type CreateUserCourseResponse = Either<
  UserCourseAlreadyExistsError | ResourceNotFoundError,
  { userCourse: UserCourse }
>;

@Injectable()
export class CreateUserCourseUsecase {
  constructor(
    private userCoursesRepository: UserCoursesRepository,
    private usersRepository: UsersRepository,
    private CoursesRepository: CoursesRepository,
  ) {}

  async exec({
    userId,
    courseId,
  }: CreateUserCourseUsecaseRequest): Promise<CreateUserCourseResponse> {
    const userCourseAlreadyRegistered =
      await this.userCoursesRepository.findByUserAndCourse({
        courseId,
        userId,
      });
    if (userCourseAlreadyRegistered)
      return left(new UserCourseAlreadyExistsError());

    const user = await this.usersRepository.findById(userId);
    if (!user) return left(new ResourceNotFoundError());

    const course = await this.CoursesRepository.findById(courseId);
    if (!course) return left(new ResourceNotFoundError());

    const userCourse = UserCourse.create({
      user,
      course,
      progress: [],
    });
    await this.userCoursesRepository.create(userCourse);

    return right({ userCourse });
  }
}
