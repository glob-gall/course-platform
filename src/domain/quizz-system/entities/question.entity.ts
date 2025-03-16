import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { AnswersList } from './answers-list';

export interface QuestionProps {
  quizzId: UniqueEntityID;
  title: string;
  description: string;
  videoURL?: string | null;
  audioURL?: string | null;

  answers: AnswersList;

  createdAt: Date;
  updatedAt?: Date | null;
}

export class Question extends Entity<QuestionProps> {
  get title() {
    return this.props.title;
  }
  set title(title: string) {
    this.props.title = title;

    this.touch();
  }

  get quizzId() {
    return this.props.quizzId;
  }

  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }
  get answers() {
    return this.props.answers;
  }

  get videoURL() {
    return this.props.videoURL;
  }
  set videoURL(videoURL: string | null | undefined) {
    this.props.videoURL = videoURL;

    this.touch();
  }

  get audioURL() {
    return this.props.audioURL;
  }
  set audioURL(audioURL: string | null | undefined) {
    this.props.audioURL = audioURL;

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
    props: Optional<QuestionProps, 'createdAt' | 'answers'>,
    id?: UniqueEntityID,
  ): Question {
    const question = new Question(
      {
        ...props,
        answers: props.answers ?? new AnswersList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return question;
  }
}
