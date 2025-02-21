import { InMemoryCoursesRepository } from '@/test/repositories/im-memory-courses.repository';
import { makeCourse } from '@/test/factories/make-course';
import { FetchCourseBySlugUsecase } from './fetch-course-by-slug.usecase';
import { Slug } from '@/core/entities/value-objects/slug';

let coursesRepository: InMemoryCoursesRepository;
let sut: FetchCourseBySlugUsecase;

describe('Fetch Course by slug Use Case', () => {
  beforeEach(() => {
    coursesRepository = new InMemoryCoursesRepository();
    sut = new FetchCourseBySlugUsecase(coursesRepository);
  });

  it('should be able to fetch a course by slug a course', async () => {
    const course = makeCourse({ slug: Slug.create('slug-01') });
    coursesRepository.items.push(course);

    const response = await sut.exec({
      slug: 'slug-01',
    });

    expect(response.isRight()).toBeTruthy();
    expect(response.value).toEqual({ course });
  });
});
