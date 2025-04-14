import { UserRole } from '@/domain/user-system/entities/enums/roles.enum';

export async function getFakeUserTokenCookie(role: UserRole) {
  const token = JSON.stringify({
    sub: 'user-id',
    user: {
      role: role.toString(),
      email: 'email@email.true',
      name: 'name',
    },
  });

  return [`user-token=${token}; HttpOnly; Path=/`];
}
