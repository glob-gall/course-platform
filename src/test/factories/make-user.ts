import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { User, UserProps } from '@/domain/user-system/entities/user.entity';
import { UserRole } from '@/domain/user-system/entities/enums/roles.enum';

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityID,
) {
  const user = User.create(
    {
      name: faker.person.fullName(),
      password: faker.internet.password(),
      role: UserRole.Student,
      email: faker.internet.email(),
      ...override,
    },
    id,
  );

  return user;
}
