import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { Role } from './enums/roles.enum';

export interface UserProps {
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class User extends Entity<UserProps> {
  get email() {
    return this.props.email;
  }

  get role() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get name() {
    return this.props.name;
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
        role: props.role ?? Role.Student,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return user;
  }
}
