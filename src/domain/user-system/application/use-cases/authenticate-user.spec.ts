import { InMemoryUsersRepository } from '@/test/repositories/im-memory-users.repository';
import { AuthenticateUserUsecase } from './authenticate-user.usecase';
import { FakeHasher } from '@/test/cryptography/fake-hasher';
import { FakeEncrypter } from '@/test/cryptography/fake-encrypter';
import { makeUser } from '@/test/factories/make-user';
import { WrongCredentialsError } from './errors/wrond-credentials.error';

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUserUsecase;
const fakeHasher = new FakeHasher();
const fakeEncrypter = new FakeEncrypter();

describe('Authenticate User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUserUsecase(
      usersRepository,
      fakeHasher,
      fakeEncrypter,
    );
  });

  it('should be able to authenticate a user', async () => {
    const user = makeUser({
      password: await fakeHasher.hash('password'),
    });
    usersRepository.items.push(user);
    const response = await sut.exec({
      email: user.email,
      password: user.password,
    });

    expect(response.isRight()).toBeTruthy();
    if (response.isRight()) {
      expect(response.value.accessToken).toEqual(
        JSON.stringify({
          sub: user.id.toString(),
          user: {
            role: user.role,
            email: user.email,
            name: user.name,
          },
        }),
      );
    }
  });

  it('should not be able to authenticate a user that dont exists', async () => {
    const user = makeUser();
    usersRepository.items.push(user);
    const response = await sut.exec({
      email: 'non-existent@email.com',
      password: '123456',
    });

    expect(response.isLeft()).toBeTruthy();

    expect(response.value).toBeInstanceOf(WrongCredentialsError);
  });
});
