import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface LectureProps {
  title: string;
  description: string;
  videoURL?: string | null;
  audioURL?: string | null;
  externalResource?: string | null;

  createdAt: Date;
  updatedAt?: Date | null;
}

export class Lecture extends Entity<LectureProps> {
  get title() {
    return this.props.title;
  }
  get description() {
    return this.props.description;
  }
  set description(description: string) {
    this.props.description = description;

    this.touch();
  }

  set title(title: string) {
    this.props.title = title;

    this.touch();
  }

  get videoURL() {
    return this.props.videoURL;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get externalResource() {
    return this.props.externalResource;
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

  touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<LectureProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): Lecture {
    const lecture = new Lecture(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    );
    return lecture;
  }
}
