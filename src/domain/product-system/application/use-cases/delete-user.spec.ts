import { InMemoryUsersRepository } from '@/test/repositories/im-memory-users.repository';
import { DeleteUserUsecase } from './delete-user.usecase';
import { makeUser } from '@/test/factories/make-user';

let usersRepository: InMemoryUsersRepository;
let sut: DeleteUserUsecase;

describe('Delete User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new DeleteUserUsecase(usersRepository);
  });

  it('should be able to Delete a user', async () => {
    const user = makeUser();
    usersRepository.items.push(user);

    const response = await sut.exec({
      id: user.id.toString(),
    });

    expect(response.isRight()).toBeTruthy();
    expect(usersRepository.items).toHaveLength(0);
  });
});
