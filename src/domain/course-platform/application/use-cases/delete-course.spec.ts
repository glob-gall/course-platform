import { InMemoryCoursesRepository } from '@/test/repositories/im-memory-courses.repository';
import { DeleteCourseUsecase } from './delete-course.usecase';
import { makeCourse } from '@/test/factories/make-course';

let coursesRepository: InMemoryCoursesRepository;
let sut: DeleteCourseUsecase;

describe('Delete Course Use Case', () => {
  beforeEach(() => {
    coursesRepository = new InMemoryCoursesRepository();
    sut = new DeleteCourseUsecase(coursesRepository);
  });

  it('should be able to Delete a course', async () => {
    const course = makeCourse();
    coursesRepository.items.push(course);

    const response = await sut.exec({
      id: course.id.toString(),
    });

    expect(response.isRight()).toBeTruthy();
    expect(coursesRepository.items).toHaveLength(0);
  });
});
