import { Either, right } from '@/core/types/either';
import { Injectable } from '@nestjs/common';
import { UserCoursesRepository } from '../repositories/user-courses.repository';
import { UserCourse } from '../../entities/user-course.entity';

export interface FetchUserCoursesUsecaseRequest {
  userId: string;
}

type FetchUserCoursesResponse = Either<null, { userCourses: UserCourse[] }>;

@Injectable()
export class FetchUserCoursesUsecase {
  constructor(private userCoursesRepository: UserCoursesRepository) {}

  async exec({
    userId,
  }: FetchUserCoursesUsecaseRequest): Promise<FetchUserCoursesResponse> {
    const userCourses = await this.userCoursesRepository.findByUserId(userId);

    return right({ userCourses });
  }
}
