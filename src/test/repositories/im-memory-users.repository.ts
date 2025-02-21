import { UsersRepository } from '@/domain/course-platform/application/repositories/users.repository';
import { User } from '@/domain/course-platform/entities/user.entity';

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];
  async create(user: User): Promise<void> {
    this.items.push(user);
  }
  async save(user: User): Promise<void> {
    const userIndex = this.items.findIndex((item) => item.id === user.id);

    this.items[userIndex] = user;
  }
  async delete(user: User): Promise<void> {
    const userIndex = this.items.findIndex((item) => item.id === user.id);
    this.items.splice(userIndex, 1);
  }
  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id.toString() === id);

    if (!user) return null;
    return user;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email.toString() === email);

    if (!user) return null;
    return user;
  }
}
