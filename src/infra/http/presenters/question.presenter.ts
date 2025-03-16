import { AnswersList } from '@/domain/quizz-system/entities/answers-list';
import { Question } from '@/domain/quizz-system/entities/question.entity';

function answersToHTTP(list: AnswersList){
 return list.currentItems.map(ans => ({
   id: ans.id.toString(),
   audioURL: ans.audioURL,
   videoURL: ans.videoURL,
   description: ans.description,
   isCorrect: ans.isCorrect,
 }))
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
