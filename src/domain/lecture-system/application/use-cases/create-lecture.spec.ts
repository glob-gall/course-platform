import { InMemoryLecturesRepository } from '@/test/repositories/im-memory-lectures.repository';
import { CreateLectureUsecase } from './create-lecture.usecase';
import { InMemorySectionsRepository } from '@/test/repositories/im-memory-sections.repository';
import { makeSection } from '@/test/factories/make-section';

let lecturesRepository: InMemoryLecturesRepository;
let sectionsRepository: InMemorySectionsRepository;
let sut: CreateLectureUsecase;

describe('Create Lecture Use Case', () => {
  beforeEach(() => {
    lecturesRepository = new InMemoryLecturesRepository();
    sectionsRepository = new InMemorySectionsRepository();
    sut = new CreateLectureUsecase(sectionsRepository, lecturesRepository);
  });

  it('should be able to create a lecture', async () => {
    const section = makeSection();
    sectionsRepository.items.push(section);
    const response = await sut.exec({
      description: 'description',
      sectionId: section.id.toString(),
      title: 'title 01',
    });

    expect(response.isRight()).toBeTruthy();

    expect(lecturesRepository.items[0].title).toEqual('title 01');
    expect(lecturesRepository.items[0].description).toEqual('description');
  });
});
