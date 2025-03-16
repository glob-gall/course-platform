import { Lecture } from '@/domain/lecture-system/entities/lecture.entity';

type LectureType = 'AUDIO' | 'VIDEO' | 'OTHER'


export class LecturePresenter {
  
  static toHTTP(lecture: Lecture) {
    let type: LectureType = 'OTHER'

    let resourceUrl = lecture.externalResource
    if(lecture.audioURL) {
      resourceUrl = lecture.audioURL
      type = 'AUDIO'
    } else if(lecture.videoURL) {
      resourceUrl = lecture.videoURL
      type = 'VIDEO'
    }

    return {
      type,
      resourceUrl,
      id: lecture.id.toString(),
      title: lecture.title,
      description: lecture.description,
      audioURL: lecture.audioURL,
      videoURL: lecture.videoURL,
      createdAt: lecture.createdAt,
      updatedAt: lecture.updatedAt,
    };
  }
}
