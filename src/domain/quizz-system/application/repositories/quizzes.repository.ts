import { Quizz } from '../../entities/quizz.entity';

export abstract class QuizzesRepository {
  abstract create(quizz: Quizz): Promise<void>;
  abstract save(quizz: Quizz): Promise<void>;
  abstract delete(quizz: Quizz): Promise<void>;
  abstract findById(id: string): Promise<Quizz | null>;
}
