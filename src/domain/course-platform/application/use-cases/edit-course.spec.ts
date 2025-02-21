import { InMemoryCoursesRepository } from '@/test/repositories/im-memory-courses.repository';
import { EditCourseUsecase } from './edit-course.usecase';
import { Slug } from '@/core/entities/value-objects/slug';
import { makeCourse } from '@/test/factories/make-course';

let coursesRepository: InMemoryCoursesRepository;
let sut: EditCourseUsecase;

describe('Edit Course Use Case', () => {
  beforeEach(() => {
    coursesRepository = new InMemoryCoursesRepository();
    sut = new EditCourseUsecase(coursesRepository);
  });

  it('should be able to edit a course', async () => {
    const course = makeCourse();
    coursesRepository.items.push(course);

    const response = await sut.exec({
      id: course.id.toString(),
      description: 'edited description',
      title: 'edited title',
      slug: 'edited-slug',
    });

    expect(response.isRight()).toBeTruthy();

    expect(coursesRepository.items[0]).toEqual(
      expect.objectContaining({
        title: 'edited title',
        slug: Slug.create('edited-slug'),
        description: 'edited description',
      }),
    );
  });
});
