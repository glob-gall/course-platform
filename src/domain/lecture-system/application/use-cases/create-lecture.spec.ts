import { InMemoryLecturesRepository } from '@/test/repositories/im-memory-lectures.repository';
import { CreateLectureUsecase } from './create-lecture.usecase';

let lecturesRepository: InMemoryLecturesRepository;
let sut: CreateLectureUsecase;

describe('Create Lecture Use Case', () => {
  beforeEach(() => {
    lecturesRepository = new InMemoryLecturesRepository();
    sut = new CreateLectureUsecase(lecturesRepository);
  });

  it('should be able to create a lecture', async () => {
    const response = await sut.exec({
      description: 'description',
      title: 'title 01',
    });

    expect(response.isRight()).toBeTruthy();

    expect(lecturesRepository.items[0].title).toEqual('title 01');
    expect(lecturesRepository.items[0].description).toEqual('description');
  });
});
