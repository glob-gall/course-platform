import { WatchedList } from '@/core/entities/watched-list';
import { Answer } from './answer.entity';

export class AnswersList extends WatchedList<Answer> {
  compareItems(a: Answer, b: Answer): boolean {
    return a.id.equals(b.id);
  }
}
