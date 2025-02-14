import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/value-objects/unique-entity-id';

export interface LectureProps {
  sectionId: UniqueEntityID;
  title: string;
  description: string;
  videoURL?: string;
  audioURL?: string;
}

export class Lecture extends Entity<LectureProps> {
  get title() {
    return this.props.title;
  }
  set title(title: string) {
    this.props.title = title;
  }

  get sectionId() {
    return this.props.sectionId;
  }

  get videoURL() {
    return this.props.videoURL;
  }

  get audioURL() {
    return this.props.audioURL;
  }

  get description() {
    return this.props.description;
  }
  set description(description: string) {
    this.props.description = description;
  }

  static create(props: LectureProps, id?: UniqueEntityID): Lecture {
    const lecture = new Lecture(props, id);
    return lecture;
  }
}
