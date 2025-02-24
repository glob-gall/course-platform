import { InMemorySectionsRepository } from '@/test/repositories/im-memory-sections.repository';
import { InMemoryLecturesRepository } from '@/test/repositories/im-memory-lectures.repository';
import { InMemorySectionLecturesRepository } from '@/test/repositories/im-memory-section-lectures.repository';
import { CreateSectionLectureUsecase } from './create-section-lecture.usecase';
import { makeSection } from '@/test/factories/make-section';

let sectionsRepository: InMemorySectionsRepository;
let lectureRepository: InMemoryLecturesRepository;
let sectionsLectureRepository: InMemorySectionLecturesRepository;

let sut: CreateSectionLectureUsecase;

describe('Create Section Lecture Use Case', () => {
  beforeEach(() => {
    sectionsRepository = new InMemorySectionsRepository();
    lectureRepository = new InMemoryLecturesRepository();
    sectionsLectureRepository = new InMemorySectionLecturesRepository();
    sut = new CreateSectionLectureUsecase(
      lectureRepository,
      sectionsRepository,
      sectionsLectureRepository,
    );
  });

  it('should be able to create a section', async () => {
    const section = makeSection();
    sectionsRepository.items.push(section);

    const response = await sut.exec({
      description: 'description',
      sectionId: section.id.toString(),
      title: 'title-01',

      lectureDescription: 'lecture-description',
      lectureTitle: 'lecture-title',
    });

    expect(response.isRight()).toBeTruthy();
    expect(lectureRepository.items[0].title).toEqual('lecture-title');
    expect(lectureRepository.items[0].description).toEqual(
      'lecture-description',
    );
  });
});
