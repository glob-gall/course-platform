import { InMemorySectionsRepository } from 'test/repositories/im-memory-sections.repository';
import { CreateSectionUsecase } from './create-section.usecase';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';

let sectionsRepository: InMemorySectionsRepository;
let sut: CreateSectionUsecase;

describe('Create Section Use Case', () => {
  beforeEach(() => {
    sectionsRepository = new InMemorySectionsRepository();
    sut = new CreateSectionUsecase(sectionsRepository);
  });

  it('should be able to create a section', async () => {
    const response = await sut.exec({
      description: 'description',
      courseId: 'course-01',
      title: 'title 01',
    });

    expect(response.isRight()).toBeTruthy();

    expect(sectionsRepository.items[0].title).toEqual('title 01');
    expect(sectionsRepository.items[0].description).toEqual('description');
    expect(sectionsRepository.items[0].courseId).toEqual(
      new UniqueEntityID('course-01'),
    );
  });
});
