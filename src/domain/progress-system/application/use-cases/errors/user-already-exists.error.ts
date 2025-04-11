import { UseCaseError } from '@/core/errors/use-case.error';

export class UserCourseAlreadyExistsError
  extends Error
  implements UseCaseError
{
  constructor() {
    super('User Already has this course');
  }
}
