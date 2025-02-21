import { Lecture } from '../../entities/lecture.entity';

export abstract class LecturesRepository {
  abstract create(lecture: Lecture): Promise<void>;
  abstract save(lecture: Lecture): Promise<void>;
  abstract delete(lecture: Lecture): Promise<void>;
  abstract findById(id: string): Promise<Lecture | null>;
}
