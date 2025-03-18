import { Public } from '@/infra/decorators/public.decorator';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { HttpError } from '../error/http.error';
import { CreateQuestionUsecase } from '@/domain/quizz-system/application/use-cases/create-question.usecase';
import { z } from 'zod';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';

const AnswerData = z.object({
  description: z.string(),
  isCorrect: z.boolean(),
  audioURL: z.string().optional(),
  externalResource: z.string().optional(),
  imageURL: z.string().optional(),
  videoURL: z.string().optional(),
})

const createQuestionBodySchema = z.object({
  description: z.string(),
  title: z.string().min(8),
  quizzId: z.string(),
  audioURL: z.string().optional(),
  imageURL: z.string().optional(),
  externalResource: z.string().optional(),
  videoURL: z.string().optional(),
  answers: z.array(AnswerData).min(2, 'A questão deve ter ao menos 2 respostas')
});
type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>;
const createQuestionValidationPipe = new ZodValidationPipe(
  createQuestionBodySchema,
);

@Controller('/question')
export class createQuestionController {
  constructor(private createQuestion: CreateQuestionUsecase) {}

  @Post()
  @Public()
  async post(
    @Body(createQuestionValidationPipe) {externalResource,imageURL,description,title,audioURL,quizzId,videoURL,answers}: CreateQuestionBodySchema
  ) {
    const result = await this.createQuestion.exec({
      title,
      description,
      audioURL,
      externalResource,
      imageURL,
      videoURL,
      quizzId,
      answersData:answers,
    });

    if (result.isLeft()) {
      throw new HttpError({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          'Oops! um erro inesperado aconteceu, por favor entre em contato com a nossa equipe',
      });
    }
  }
}
