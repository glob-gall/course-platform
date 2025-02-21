import { InMemorySectionsRepository } from '@/test/repositories/im-memory-sections.repository';
import { EditSectionUsecase } from './edit-section.usecase';
import { makeSection } from '@/test/factories/make-section';

let sectionsRepository: InMemorySectionsRepository;
let sut: EditSectionUsecase;

describe('Edit Section Use Case', () => {
  beforeEach(() => {
    sectionsRepository = new InMemorySectionsRepository();
    sut = new EditSectionUsecase(sectionsRepository);
  });

  it('should be able to edit a section', async () => {
    const section = makeSection();
    sectionsRepository.items.push(section);

    const response = await sut.exec({
      id: section.id.toString(),
      description: 'edited description',
      title: 'edited title',
    });

    expect(response.isRight()).toBeTruthy();

    expect(sectionsRepository.items[0]).toEqual(
      expect.objectContaining({
        title: 'edited title',
        description: 'edited description',
      }),
    );
  });
});
