import { Either, right } from '@/core/types/either';
import { Lecture } from '../../entities/lecture.entity';
import { LecturesRepository } from '../repositories/lectures.repository';
import { Injectable } from '@nestjs/common';

type FetchManyLectureResponse = Either<null, { lectures: Lecture[] }>;

@Injectable()
export class FetchManyLectureUsecase {
  constructor(private lecturesRepository: LecturesRepository) {}

  async exec(): Promise<FetchManyLectureResponse> {
    const lectures = await this.lecturesRepository.findMany();

    return right({ lectures });
  }
}
