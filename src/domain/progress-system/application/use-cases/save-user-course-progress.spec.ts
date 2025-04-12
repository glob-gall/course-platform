import { makeUser } from '@/test/factories/make-user';
import { InMemoryUserCoursesRepository } from '@/test/repositories/im-memory-user-courses.repository';
import { makeUserCourse } from '@/test/factories/make-user-course';
import { SaveUserCourseProgressUsecase } from './save-user-course-progress.usecase';
import { InMemorySectionItemProgressRepository } from '@/test/repositories/im-memory-section-item-progress.repository';
import { makeCourse } from '@/test/factories/make-course';
import { makeSectionProgress } from '@/test/factories/make-section-progress';
import { makeSectionItemProgress } from '@/test/factories/make-section-item-progress';

let userCoursesRepository: InMemoryUserCoursesRepository;
let sectionItemProgressRepository: InMemorySectionItemProgressRepository;
let sut: SaveUserCourseProgressUsecase;

describe('Save user-course progress Use Case', () => {
  beforeEach(() => {
    userCoursesRepository = new InMemoryUserCoursesRepository();
    sectionItemProgressRepository = new InMemorySectionItemProgressRepository();
    sut = new SaveUserCourseProgressUsecase(
      userCoursesRepository,
      sectionItemProgressRepository,
    );
  });

  it('should be able to update user-course progress', async () => {
    const user = makeUser();
    const course = makeCourse();
    const sectionItemProgress = makeSectionItemProgress();
    const sectionProgress = makeSectionProgress({
      itemsProgress: [sectionItemProgress],
    });

    sectionItemProgressRepository.items.push(sectionItemProgress);

    const userCourse1 = makeUserCourse({
      user,
      course,
      progress: [sectionProgress],
    });
    userCoursesRepository.items.push(userCourse1);

    const response = await sut.exec({
      concluded: true,
      courseId: course.id.toString(),
      userId: user.id.toString(),
      sectionItemId: sectionItemProgress.id.toString(),
    });

    expect(response.isRight()).toBeTruthy();
    expect(sectionItemProgressRepository.items[0]).toEqual(
      expect.objectContaining({
        concluded: true,
      }),
    );
  });
});
