import { InMemoryCoursesRepository } from '@/test/repositories/im-memory-courses.repository';
import { makeCourse } from '@/test/factories/make-course';
import { Slug } from '@/core/entities/value-objects/slug';
import { FetchManyCoursesUsecase } from './fetch-many-courses.usecase';
import { Order } from '@/core/repositories/filters';

let coursesRepository: InMemoryCoursesRepository;
let sut: FetchManyCoursesUsecase;

describe('Fetch Course by slug Use Case', () => {
  beforeEach(() => {
    coursesRepository = new InMemoryCoursesRepository();
    sut = new FetchManyCoursesUsecase(coursesRepository);
  });

  it('should be able to fetch a course by slug a course', async () => {
    for (let i = 0; i < 20; i++) {
      const course = makeCourse({title: `title ${i}`});
      coursesRepository.items.push(course);
    }

    const response = await sut.exec({
      order:Order.ASC,
      page: 1,
      title:''
    });

    expect(response.isRight()).toBeTruthy();
    expect(response.value?.courses).toHaveLength(20);
  });
});
