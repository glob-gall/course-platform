import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Role } from '@/domain/course-platform/entities/enums/roles.enum';
import { User } from '@/domain/course-platform/entities/user.entity';
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
    const user = User.create(
      {
        email: raw.email,
        name: raw.name,
        password: raw.password,
        role: Role[raw.role],
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );

    return user;
  }
}
