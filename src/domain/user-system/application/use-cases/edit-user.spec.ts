import { InMemoryUsersRepository } from '@/test/repositories/im-memory-users.repository';
import { EditUserUsecase } from './edit-user.usecase';
import { makeUser } from '@/test/factories/make-user';

let usersRepository: InMemoryUsersRepository;
let sut: EditUserUsecase;

describe('Edit User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new EditUserUsecase(usersRepository);
  });

  it('should be able to edit a user', async () => {
    const user = makeUser();
    usersRepository.items.push(user);

    const response = await sut.exec({
      id: user.id.toString(),
      name: 'edited name',
    });

    expect(response.isRight()).toBeTruthy();

    expect(usersRepository.items[0]).toEqual(
      expect.objectContaining({
        name: 'edited name',
      }),
    );
  });
});
