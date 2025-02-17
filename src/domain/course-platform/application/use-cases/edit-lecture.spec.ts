import { InMemoryLecturesRepository } from 'test/repositories/im-memory-lectures.repository';
import { EditLectureUsecase } from './edit-lecture.usecase';
import { makeLecture } from 'test/factories/make-lecture';

let lecturesRepository: InMemoryLecturesRepository;
let sut: EditLectureUsecase;

describe('Edit Lecture Use Case', () => {
  beforeEach(() => {
    lecturesRepository = new InMemoryLecturesRepository();
    sut = new EditLectureUsecase(lecturesRepository);
  });

  it('should be able to edit a lecture', async () => {
    const lecture = makeLecture();
    lecturesRepository.items.push(lecture);

    const response = await sut.exec({
      id: lecture.id.toString(),
      description: 'edited description',
      title: 'edited title',
    });

    expect(response.isRight()).toBeTruthy();

    expect(lecturesRepository.items[0]).toEqual(
      expect.objectContaining({
        title: 'edited title',
        description: 'edited description',
      }),
    );
  });
});
