import { InMemorySectionsRepository } from '@/test/repositories/im-memory-sections.repository';
import { FetchSectionsByCourseIdUsecase } from './fetch-sections-by-courseId.usecase';
import { makeSection } from '@/test/factories/make-section';
import { makeCourse } from '@/test/factories/make-course';

let sectionsRepository: InMemorySectionsRepository;
let sut: FetchSectionsByCourseIdUsecase;

describe('Fetch Sections by courseId Use Case', () => {
  beforeEach(() => {
    sectionsRepository = new InMemorySectionsRepository();
    sut = new FetchSectionsByCourseIdUsecase(sectionsRepository);
  });

  it('should be able to fetch sections by courseID', async () => {
    const course1 = makeCourse();
    const course2 = makeCourse();

    const section1 = makeSection({
      course: course1,
    });
    const section2 = makeSection({
      course: course1,
    });
    const section3 = makeSection({
      course: course2,
    });
    sectionsRepository.items.push(section1, section2, section3);

    const response = await sut.exec({
      courseId: course1.id.toString(),
    });

    expect(response.isRight()).toBeTruthy();
    if (response.isRight()) expect(response.value.sections).toHaveLength(2);

    expect(response.value).toEqual({
      sections: expect.arrayContaining([
        expect.objectContaining({
          title: section1.title,
        }),
        expect.objectContaining({
          title: section2.title,
        }),
      ]),
    });
  });
});
