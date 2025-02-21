import { CreateQuizzUsecase } from './create-quizz.usecase';
import { InMemoryQuizzesRepository } from 'test/repositories/im-memory-quizzes.repository';

let sectionsRepository: InMemoryQuizzesRepository;
let sut: CreateQuizzUsecase;

describe('Create Section Use Case', () => {
  beforeEach(() => {
    sectionsRepository = new InMemoryQuizzesRepository();
    sut = new CreateQuizzUsecase(sectionsRepository);
  });

  it('should be able to create a section', async () => {
    const response = await sut.exec({
      description: 'description',
      title: 'title 01',
    });

    expect(response.isRight()).toBeTruthy();

    expect(sectionsRepository.items[0].title).toEqual('title 01');
    expect(sectionsRepository.items[0].description).toEqual('description');
  });
});
