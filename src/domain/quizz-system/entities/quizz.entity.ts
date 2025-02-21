import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { QuizzQuestionList } from './quizz-question-list';

export interface QuizzProps {
  title: string;
  description: string;

  questions: QuizzQuestionList;

  createdAt: Date;
  updatedAt?: Date | null;
}

export class Quizz extends Entity<QuizzProps> {
  get title() {
    return this.props.title;
  }
  set title(title: string) {
    this.props.title = title;

    this.touch();
  }

  get description() {
    return this.props.description;
  }
  set description(description: string) {
    this.props.description = description;

    this.touch();
  }

  touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<QuizzProps, 'createdAt' | 'questions'>,
    id?: UniqueEntityID,
  ): Quizz {
    const quizz = new Quizz(
      {
        ...props,
        questions: props.questions ?? new QuizzQuestionList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return quizz;
  }
}
