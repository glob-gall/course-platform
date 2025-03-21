import { LecturesRepository } from '@/domain/lecture-system/application/repositories/lectures.repository';
import { Lecture } from '@/domain/lecture-system/entities/lecture.entity';

export class InMemoryLecturesRepository implements LecturesRepository {
  public items: Lecture[] = [];

  async findMany(): Promise<Lecture[]> {
    return this.items;
  }

  async create(lecture: Lecture): Promise<void> {
    this.items.push(lecture);
  }

  async save(lecture: Lecture): Promise<void> {
    const lectureIndex = this.items.findIndex((item) => item.id === lecture.id);
    this.items[lectureIndex] = lecture;
  }

  async findById(id: string): Promise<Lecture | null> {
    const lecture = this.items.find((item) => item.id.toString() === id);
    if (!lecture) return null;
    return lecture;
  }

  async delete(lecture: Lecture): Promise<void> {
    const lectureIndex = this.items.findIndex((item) => item.id === lecture.id);
    this.items.splice(lectureIndex, 1);
  }
}
