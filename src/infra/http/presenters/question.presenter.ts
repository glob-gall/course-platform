import { AnswersList } from '@/domain/quizz-system/entities/answers-list';
import { Question } from '@/domain/quizz-system/entities/question.entity';

type AnswerType=  'TEXT' | 'VIDEO' | 'AUDIO' | 'OTHER' | 'IMAGE';

function answersToHTTP(list: AnswersList){
  return list.currentItems.map(ans => {
    let type:AnswerType = 'TEXT'
    let resourceURL =''

    if(ans.externalResource) {
      type = 'AUDIO'
      resourceURL = ans.externalResource
    }else if(ans.audioURL) {
      type = 'AUDIO'
      resourceURL = ans.audioURL
    }else if(ans.videoURL) {
      type = 'VIDEO'
      resourceURL = ans.videoURL
    }else if(ans.imageURL) {
      type = 'IMAGE'
      resourceURL = ans.imageURL
    }

    return {
      type,
      resourceURL,
      id: ans.id.toString(),
      description: ans.description,
      isCorrect: ans.isCorrect,
    }
  })
}
export class QuestionPresenter {
  
  
  static toHTTP(question: Question) {
    return {
      id: question.id.toString(),
      quizzId: question.quizzId,
      title: question.title,
      answers: answersToHTTP(question.answers),
      description: question.description,
      audioURL: question.audioURL,
      videoURL: question.videoURL,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    };
  }
}
