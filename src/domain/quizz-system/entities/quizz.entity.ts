import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { Question } from './question.entity';

export interface QuizzProps {
  title: string;
  description: string;

  questions: Question[];

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
    props: Optional<QuizzProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): Quizz {
    const quizz = new Quizz(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return quizz;
  }
}
