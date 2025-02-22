import { InMemoryQuizzesRepository } from '@/test/repositories/im-memory-quizzes.repository';
import { DeleteQuizzUsecase } from './delete-quizz.usecase';
import { makeQuizz } from '@/test/factories/make-quizz';

let quizzsRepository: InMemoryQuizzesRepository;
let sut: DeleteQuizzUsecase;

describe('Delete Quizz Use Case', () => {
  beforeEach(() => {
    quizzsRepository = new InMemoryQuizzesRepository();
    sut = new DeleteQuizzUsecase(quizzsRepository);
  });

  it('should be able to Delete a quizz', async () => {
    const quizz = makeQuizz();
    quizzsRepository.items.push(quizz);

    const response = await sut.exec({
      id: quizz.id.toString(),
    });

    expect(response.isRight()).toBeTruthy();
    expect(quizzsRepository.items).toHaveLength(0);
  });
});
