import {
  FindByUserAndCourseParams,
  UserCoursesRepository,
} from '@/domain/progress-system/application/repositories/user-courses.repository';
import { UserCourse } from '@/domain/progress-system/entities/user-course.entity';

export class InMemoryUserCoursesRepository implements UserCoursesRepository {
  public items: UserCourse[] = [];

  async create(user: UserCourse): Promise<void> {
    this.items.push(user);
  }

  async save(userCourse: UserCourse): Promise<void> {
    const userIndex = this.items.findIndex((item) => item.id === userCourse.id);

    this.items[userIndex] = userCourse;
  }

  async findByUserAndCourse({
    courseId,
    userId,
  }: FindByUserAndCourseParams): Promise<UserCourse | null> {
    const userCourse = this.items.find(
      (item) =>
        item.user.id.toString() === userId &&
        item.course.id.toString() === courseId,
    );

    if (!userCourse) return null;
    return userCourse;
  }

  async findByUserId(userId: string): Promise<UserCourse[]> {
    const userCourses = this.items.filter(
      (item) => item.user.id.toString() === userId,
    );
    return userCourses;
  }
}
