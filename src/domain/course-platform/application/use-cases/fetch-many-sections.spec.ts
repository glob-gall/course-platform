import { InMemorySectionsRepository } from '@/test/repositories/im-memory-sections.repository';
import { FetchSectionsByCourseIdUsecase } from './fetch-sections-by-courseId.usecase';
import { makeSection } from '@/test/factories/make-section';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { FetchManySectionsUsecase } from './fetch-many-sections.usecase';

let sectionsRepository: InMemorySectionsRepository;
let sut: FetchManySectionsUsecase;

describe('Fetch many Sections Use Case', () => {
  beforeEach(() => {
    sectionsRepository = new InMemorySectionsRepository();
    sut = new FetchManySectionsUsecase(sectionsRepository);
  });

  it('should be able to fetch sections by courseID', async () => {
    const section1 = makeSection();
    const section2 = makeSection();
    const section3 = makeSection();
    sectionsRepository.items.push(section1, section2, section3);

    const response = await sut.exec({
      courseId: 'course-01',
    });

    expect(response.isRight()).toBeTruthy();
    if (response.isRight()) expect(response.value.sections).toHaveLength(3);
  });
});
