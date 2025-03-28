import { InMemoryUsersRepository } from '@/test/repositories/im-memory-users.repository';
import { CreateUserUsecase } from './create-user.usecase';
import { FakeHasher } from '@/test/cryptography/fake-hasher';
import { makeUser } from '@/test/factories/make-user';
import { UserAlreadyExistsError } from '@/domain/course-platform/application/use-cases/errors/user-already-exists.error';

let usersRepository: InMemoryUsersRepository;
let hasher: FakeHasher;
let sut: CreateUserUsecase;

describe('Create User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    hasher = new FakeHasher();
    sut = new CreateUserUsecase(usersRepository, hasher);
  });

  it('should be able to create a user', async () => {
    const response = await sut.exec({
      email: 'user@mail.com',
      name: 'user 1',
      password: '123456',
    });

    expect(response.isRight()).toBeTruthy();

    expect(usersRepository.items[0].name).toEqual('user 1');
    expect(usersRepository.items[0].email).toEqual('user@mail.com');
    expect(usersRepository.items[0].password).toEqual('123456-hashed');
  });
  it('should not be able to create 2 user with same email', async () => {
    const userRegistred = makeUser({
      email: 'user@mail.com',
    });
    usersRepository.items.push(userRegistred);

    const response = await sut.exec({
      email: 'user@mail.com',
      name: 'user 1',
      password: '123456',
    });

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(UserAlreadyExistsError);
  });
});
