import { InMemorySectionsRepository } from '@/test/repositories/im-memory-sections.repository';
import { CreateSectionUsecase } from './create-section.usecase';
import { InMemoryCoursesRepository } from '@/test/repositories/im-memory-courses.repository';
import { makeCourse } from '@/test/factories/make-course';

let sectionsRepository: InMemorySectionsRepository;
let coursesRepository: InMemoryCoursesRepository;
let sut: CreateSectionUsecase;

describe('Create Section Use Case', () => {
  beforeEach(() => {
    sectionsRepository = new InMemorySectionsRepository();
    coursesRepository = new InMemoryCoursesRepository();
    sut = new CreateSectionUsecase(sectionsRepository, coursesRepository);
  });

  it('should be able to create a section', async () => {
    const course = makeCourse();
    coursesRepository.items.push(course);

    const response = await sut.exec({
      description: 'description',
      courseId: course.id.toString(),
      title: 'title 01',
    });

    expect(response.isRight()).toBeTruthy();

    expect(sectionsRepository.items[0].title).toEqual('title 01');
    expect(sectionsRepository.items[0].description).toEqual('description');
    expect(sectionsRepository.items[0].course?.id).toEqual(course.id);
  });
});
