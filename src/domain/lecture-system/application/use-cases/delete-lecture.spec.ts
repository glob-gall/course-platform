import { InMemoryLecturesRepository } from '@/test/repositories/im-memory-lectures.repository';
import { DeleteLectureUsecase } from './delete-lecture.usecase';
import { makeLecture } from '@/test/factories/make-lecture';

let lecturesRepository: InMemoryLecturesRepository;
let sut: DeleteLectureUsecase;

describe('Delete Lecture Use Case', () => {
  beforeEach(() => {
    lecturesRepository = new InMemoryLecturesRepository();
    sut = new DeleteLectureUsecase(lecturesRepository);
  });

  it('should be able to Delete a lecture', async () => {
    const lecture = makeLecture();
    lecturesRepository.items.push(lecture);

    const response = await sut.exec({
      id: lecture.id.toString(),
    });

    expect(response.isRight()).toBeTruthy();
    expect(lecturesRepository.items).toHaveLength(0);
  });
});
