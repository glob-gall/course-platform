import { InMemoryCoursesRepository } from 'test/repositories/im-memory-courses.repository';
import { makeCourse } from 'test/factories/make-course';
import { FetchCourseByIdUsecase } from './fetch-course-by-id.usecase';

let coursesRepository: InMemoryCoursesRepository;
let sut: FetchCourseByIdUsecase;

describe('Fetch Course by id Use Case', () => {
  beforeEach(() => {
    coursesRepository = new InMemoryCoursesRepository();
    sut = new FetchCourseByIdUsecase(coursesRepository);
  });

  it('should be able to fetch a course by id a course', async () => {
    const course = makeCourse();
    coursesRepository.items.push(course);

    const response = await sut.exec({
      id: course.id.toString(),
    });

    expect(response.isRight()).toBeTruthy();
    expect(response.value).toEqual({ course });
  });
});
