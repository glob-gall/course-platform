import { WatchedList } from '@/core/entities/watched-list';
import { Question } from './question.entity';

export class QuizzQuestionList extends WatchedList<Question> {
  compareItems(a: Question, b: Question): boolean {
    return a.id.equals(b.id);
  }
}
