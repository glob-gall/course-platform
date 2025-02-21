import { InMemorySectionsRepository } from '@/test/repositories/im-memory-sections.repository';
import { FetchSectionsByCourseIdUsecase } from './fetch-sections-by-courseId.usecase';
import { makeSection } from '@/test/factories/make-section';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';

let sectionsRepository: InMemorySectionsRepository;
let sut: FetchSectionsByCourseIdUsecase;

describe('Fetch Sections by courseId Use Case', () => {
  beforeEach(() => {
    sectionsRepository = new InMemorySectionsRepository();
    sut = new FetchSectionsByCourseIdUsecase(sectionsRepository);
  });

  it('should be able to fetch sections by courseID', async () => {
    const section1 = makeSection({
      courseId: new UniqueEntityID('course-01'),
    });
    const section2 = makeSection({
      courseId: new UniqueEntityID('course-01'),
    });
    const section3 = makeSection({
      courseId: new UniqueEntityID('course-02'),
    });
    sectionsRepository.items.push(section1, section2, section3);

    const response = await sut.exec({
      courseId: 'course-01',
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
