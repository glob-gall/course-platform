import { InMemoryCoursesRepository } from 'test/repositories/im-memory-courses.repository';
import { CreateCourseUsecase } from './create-course.usecase';
import { Slug } from '@/core/entities/value-objects/slug';

let coursesRepository: InMemoryCoursesRepository;
let sut: CreateCourseUsecase;

describe('Create Course Use Case', () => {
  beforeEach(() => {
    coursesRepository = new InMemoryCoursesRepository();
    sut = new CreateCourseUsecase(coursesRepository);
  });

  it('should be able to create a course', async () => {
    const response = await sut.exec({
      description: 'description',
      title: 'title 01',
    });

    expect(response.isRight()).toBeTruthy();

    expect(coursesRepository.items[0]).toEqual(
      expect.objectContaining({
        title: 'title 01',
        slug: Slug.create('title-01'),
        description: 'description',
      }),
    );
  });
});
