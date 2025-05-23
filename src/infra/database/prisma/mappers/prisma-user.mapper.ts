import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { UserRole } from '@/domain/user-system/entities/enums/roles.enum';
import { User } from '@/domain/user-system/entities/user.entity';

import { User as PrismaUser } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma(user: User): PrismaUser {
    return {
      id: user.id.toString(),
      email: user.email,
      name: user.name,
      password: user.password,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt ?? null,
    };
  }

  static toDomain(raw: PrismaUser): User {
    const role = Object.values(UserRole).includes(raw.role as UserRole)
      ? (raw.role as UserRole)
      : UserRole.Student;

    const user = User.create(
      {
        email: raw.email,
        name: raw.name,
        password: raw.password,
        purchases: [],
        userCourse: [],
        role,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );

    return user;
  }
}
