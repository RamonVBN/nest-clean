import { Controller, Get, Query, UseGuards } from "@nestjs/common"
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe"

import z from "zod"
import { JwtAuthGuard } from "@/infra/auth/jwt.guard"
import { FetchRecentQuestionsUseCase } from "@/domain/forum/application/use-cases/fetch-recent-questions"
import { throwError } from "rxjs"
import { QuestionPresenter } from "../presenters/question-presenter"

const pageQueryParamSchema = z
  .string()
  .optional()
  .default("1")
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParam = z.infer<typeof pageQueryParamSchema>

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionsController {
  constructor(private fetchRecentsQuestionsUseCase: FetchRecentQuestionsUseCase) {}

  @Get()
  async handle(@Query("page", queryValidationPipe) page: PageQueryParam) {

    const result = await this.fetchRecentsQuestionsUseCase.execute({
      page
    })

    if (result.isLeft()) {

      throw new Error("errado fi")
    }

    const questions = result.value.questions

    return {
      questions: questions.map(QuestionPresenter.toHTTP),
    }
  }
}
