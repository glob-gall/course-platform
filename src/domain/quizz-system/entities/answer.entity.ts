import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface AnswerProps {
  questionId: UniqueEntityID;
  isCorrect: boolean;

  description: string;
  videoURL?: string | null;
  audioURL?: string | null;
  imageURL?: string | null;
  externalResource?: string | null;

  createdAt: Date;
  updatedAt?: Date | null;
}

export class Answer extends Entity<AnswerProps> {
  get questionId() {
    return this.props.questionId;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  get isCorrect() {
    return this.props.isCorrect;
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
  get imageURL() {
    return this.props.imageURL;
  }
  set imageURL(imageURL: string | null | undefined) {
    this.props.imageURL = imageURL;

    this.touch();
  }
  get externalResource() {
    return this.props.externalResource;
  }
  set externalResource(externalResource: string | null | undefined) {
    this.props.externalResource = externalResource;

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
    props: Optional<AnswerProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): Answer {
    const answer = new Answer(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    );
    return answer;
  }
}
