import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { UserRole } from './enums/roles.enum';
import { UserCourse } from '@/domain/progress-system/entities/user-course.entity';
import { Purchase } from '@/domain/product-system/entities/purchase.entity';

export interface UserProps {
  name: string;
  email: string;
  password: string;
  role: UserRole;

  userCourse: UserCourse[];
  purchases: Purchase[];

  createdAt: Date;
  updatedAt?: Date | null;
}

export class User extends Entity<UserProps> {
  get email() {
    return this.props.email;
  }

  get role() {
    return this.props.role;
  }

  get purchases() {
    return this.props.purchases;
  }

  get userCourse() {
    return this.props.userCourse;
  }

  get password() {
    return this.props.password;
  }

  get name() {
    return this.props.name;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
  set name(name: string) {
    this.props.name = name;
    this.touch();
  }

  touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<UserProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): User {
    const user = new User(
      {
        ...props,
        role: props.role ?? UserRole.Student,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return user;
  }
}
