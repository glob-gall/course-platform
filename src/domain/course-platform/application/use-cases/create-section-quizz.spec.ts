import { InMemorySectionsRepository } from '@/test/repositories/im-memory-sections.repository';
import { InMemoryQuizzesRepository } from '@/test/repositories/im-memory-quizzes.repository';
import { InMemorySectionQuizzesRepository } from '@/test/repositories/im-memory-section-quizzes.repository';
import { CreateSectionQuizzUsecase } from './create-section-quizz.usecase';
import { makeSection } from '@/test/factories/make-section';

let sectionsRepository: InMemorySectionsRepository;
let quizzRepository: InMemoryQuizzesRepository;
let sectionsQuizzRepository: InMemorySectionQuizzesRepository;

let sut: CreateSectionQuizzUsecase;

describe('Create Section Quizz Use Case', () => {
  beforeEach(() => {
    sectionsRepository = new InMemorySectionsRepository();
    quizzRepository = new InMemoryQuizzesRepository();
    sectionsQuizzRepository = new InMemorySectionQuizzesRepository();
    sut = new CreateSectionQuizzUsecase(
      quizzRepository,
      sectionsRepository,
      sectionsQuizzRepository,
    );
  });

  it('should be able to create a section', async () => {
    const section = makeSection();
    sectionsRepository.items.push(section);

    const response = await sut.exec({
      description: 'description',
      sectionId: section.id.toString(),
      title: 'title-01',

      quizzDescription: 'quizz-description',
      quizzTitle: 'quizz-title',
    });

    expect(response.isRight()).toBeTruthy();
    expect(quizzRepository.items[0].title).toEqual('quizz-title');
    expect(quizzRepository.items[0].description).toEqual('quizz-description');
  });
});
