import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { User, UserProps } from '@/domain/course-platform/entities/user.entity';
import { Role } from '@/domain/course-platform/entities/enums/roles.enum';

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityID,
) {
  const user = User.create(
    {
      name: faker.person.fullName(),
      password: faker.internet.password(),
      role: Role.Student,
      email: faker.internet.email(),
      ...override,
    },
    id,
  );

  return user;
}
