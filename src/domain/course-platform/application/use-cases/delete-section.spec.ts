import { InMemorySectionsRepository } from 'test/repositories/im-memory-sections.repository';
import { DeleteSectionUsecase } from './delete-section.usecase';
import { makeSection } from 'test/factories/make-section';

let sectionsRepository: InMemorySectionsRepository;
let sut: DeleteSectionUsecase;

describe('Delete Section Use Case', () => {
  beforeEach(() => {
    sectionsRepository = new InMemorySectionsRepository();
    sut = new DeleteSectionUsecase(sectionsRepository);
  });

  it('should be able to Delete a section', async () => {
    const section = makeSection();
    sectionsRepository.items.push(section);

    const response = await sut.exec({
      id: section.id.toString(),
    });

    expect(response.isRight()).toBeTruthy();
    expect(sectionsRepository.items).toHaveLength(0);
  });
});
