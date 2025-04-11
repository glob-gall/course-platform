import { makeUser } from '@/test/factories/make-user';
import { InMemoryUserCoursesRepository } from '@/test/repositories/im-memory-user-courses.repository';
import { makeUserCourse } from '@/test/factories/make-user-course';
import { FetchUserCoursesUsecase } from './fetch-user-courses.usecase';

let userCoursesRepository: InMemoryUserCoursesRepository;
let sut: FetchUserCoursesUsecase;

describe('Fetch userCourses Use Case', () => {
  beforeEach(() => {
    userCoursesRepository = new InMemoryUserCoursesRepository();
    sut = new FetchUserCoursesUsecase(userCoursesRepository);
  });

  it('should be able to fetch the user courses', async () => {
    const user = makeUser();
    const userCourse1 = makeUserCourse({
      user,
    });
    const userCourse2 = makeUserCourse({
      user,
    });
    userCoursesRepository.items.push(userCourse1, userCourse2);

    const response = await sut.exec({
      userId: user.id.toString(),
    });

    expect(response.isRight()).toBeTruthy();

    expect(response.value?.userCourses).toEqual(
      expect.arrayContaining([userCourse1, userCourse2]),
    );
  });
});
