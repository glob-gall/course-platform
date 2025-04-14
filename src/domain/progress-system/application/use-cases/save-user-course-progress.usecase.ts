import { Either, left, right } from '@/core/types/either';
import { Injectable } from '@nestjs/common';
import { UserCoursesRepository } from '../repositories/user-courses.repository';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { SectionItemProgresssRepository } from '../repositories/section-item-progress.repository';

export interface SaveUserCourseProgressUsecaseRequest {
  userId: string;
  courseId: string;
  sectionItemId: string;
  concluded: boolean;
}

export type SaveUserCourseProgressResponse = Either<
  ResourceNotFoundError,
  null
>;

export abstract class ISaveUserCourseProgressUsecase {
  abstract exec({
    userId,
    courseId,
    concluded,
    sectionItemId,
  }: SaveUserCourseProgressUsecaseRequest): Promise<SaveUserCourseProgressResponse>;
}
@Injectable()
export class SaveUserCourseProgressUsecase
  implements ISaveUserCourseProgressUsecase
{
  constructor(
    private userCoursesRepository: UserCoursesRepository,
    private sectionItemsRepository: SectionItemProgresssRepository,
  ) {}

  async exec({
    userId,
    courseId,
    concluded,
    sectionItemId,
  }: SaveUserCourseProgressUsecaseRequest): Promise<SaveUserCourseProgressResponse> {
    const userCourse = await this.userCoursesRepository.findByUserAndCourse({
      userId,
      courseId,
    });
    if (!userCourse) return left(new ResourceNotFoundError());

    const progressItem =
      await this.sectionItemsRepository.findById(sectionItemId);
    if (!progressItem) return left(new ResourceNotFoundError());

    progressItem.concluded = concluded;
    await this.sectionItemsRepository.save(progressItem);
    return right(null);
  }
}
