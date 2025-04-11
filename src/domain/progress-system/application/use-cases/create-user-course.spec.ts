import { InMemoryUsersRepository } from '@/test/repositories/im-memory-users.repository';
import { CreateUserCourseUsecase } from './create-user-course.usecase';
import { makeUser } from '@/test/factories/make-user';
import { InMemoryCoursesRepository } from '@/test/repositories/im-memory-courses.repository';
import { InMemoryUserCoursesRepository } from '@/test/repositories/im-memory-user-courses.repository';
import { makeCourse } from '@/test/factories/make-course';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found.error';
import { makeUserCourse } from '@/test/factories/make-user-course';
import { UserCourseAlreadyExistsError } from './errors/user-already-exists.error';

let userCoursesRepository: InMemoryUserCoursesRepository;
let usersRepository: InMemoryUsersRepository;
let coursesRepository: InMemoryCoursesRepository;
let sut: CreateUserCourseUsecase;

describe('Create User Use Case', () => {
  beforeEach(() => {
    userCoursesRepository = new InMemoryUserCoursesRepository();
    usersRepository = new InMemoryUsersRepository();
    coursesRepository = new InMemoryCoursesRepository();
    sut = new CreateUserCourseUsecase(
      userCoursesRepository,
      usersRepository,
      coursesRepository,
    );
  });

  it('should be able to create a user-course', async () => {
    const user = makeUser();
    usersRepository.items.push(user);
    const course = makeCourse();
    coursesRepository.items.push(course);

    const response = await sut.exec({
      userId: user.id.toString(),
      courseId: course.id.toString(),
    });

    expect(response.isRight()).toBeTruthy();

    expect(userCoursesRepository.items[0].course.title).toEqual(course.title);
    expect(userCoursesRepository.items[0].user.name).toEqual(user.name);
  });

  it('should not be able to create a userCourse with no existent user', async () => {
    const course = makeCourse();
    coursesRepository.items.push(course);

    const response = await sut.exec({
      userId: 'fake-id',
      courseId: course.id.toString(),
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not be able to create a userCourse with no existent course', async () => {
    const user = makeUser();
    usersRepository.items.push(user);

    const response = await sut.exec({
      userId: user.id.toString(),
      courseId: 'fake-id',
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not be able to create a userCourse that already exists', async () => {
    const user = makeUser();
    usersRepository.items.push(user);
    const course = makeCourse();
    coursesRepository.items.push(course);

    const userCourse = makeUserCourse({
      user,
      course,
    });
    userCoursesRepository.items.push(userCourse);

    const response = await sut.exec({
      userId: user.id.toString(),
      courseId: course.id.toString(),
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(UserCourseAlreadyExistsError);
  });
});
