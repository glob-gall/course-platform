import { UserCourse } from '../../entities/user-course.entity';

export interface FindByUserAndCourseParams {
  userId: string;
  courseId: string;
}

export abstract class UserCoursesRepository {
  abstract create(user: UserCourse): Promise<void>;
  abstract save(user: UserCourse): Promise<void>;
  abstract findByUserId(userId: string): Promise<UserCourse[]>;
  abstract findByUserAndCourse({
    courseId,
    userId,
  }: FindByUserAndCourseParams): Promise<UserCourse | null>;
}
