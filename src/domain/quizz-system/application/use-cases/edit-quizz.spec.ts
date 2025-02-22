import { InMemoryQuizzesRepository } from '@/test/repositories/im-memory-quizzes.repository';
import { EditQuizzUsecase } from './edit-quizz.usecase';
import { makeQuizz } from '@/test/factories/make-quizz';

let quizzsRepository: InMemoryQuizzesRepository;
let sut: EditQuizzUsecase;

describe('Edit Quizz Use Case', () => {
  beforeEach(() => {
    quizzsRepository = new InMemoryQuizzesRepository();
    sut = new EditQuizzUsecase(quizzsRepository);
  });

  it('should be able to edit a quizz', async () => {
    const quizz = makeQuizz();
    quizzsRepository.items.push(quizz);

    const response = await sut.exec({
      id: quizz.id.toString(),
      description: 'edited description',
      title: 'edited title',
    });

    expect(response.isRight()).toBeTruthy();

    expect(quizzsRepository.items[0]).toEqual(
      expect.objectContaining({
        title: 'edited title',
        description: 'edited description',
      }),
    );
  });
});
