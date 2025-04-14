import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { left, right } from '@/core/types/either';
import {
  ISaveUserCourseProgressUsecase,
  SaveUserCourseProgressResponse,
  SaveUserCourseProgressUsecaseRequest,
} from '@/domain/progress-system/application/use-cases/save-user-course-progress.usecase';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FakeSaveUserCourseProgress
  implements ISaveUserCourseProgressUsecase
{
  async exec({
    userId,
    courseId,
    sectionItemId,
  }: SaveUserCourseProgressUsecaseRequest): Promise<SaveUserCourseProgressResponse> {
    if (
      userId !== 'user-id' ||
      courseId !== 'course-id' ||
      sectionItemId !== 'section-item-id'
    )
      return left(new ResourceNotFoundError());
    return right(null);
  }
}
