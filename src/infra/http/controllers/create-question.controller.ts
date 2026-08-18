import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common"
import { CurrentUser } from "@/infra/auth/current-user-decorator"
import type { TokenPayload } from "@/infra/auth/jwt.strategy"
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe"
import { PrismaService } from "@/infra/database/prisma/prisma.service"
import z from "zod"
import { JwtAuthGuard } from "@/infra/auth/jwt.guard"
import { CreateQuestionUseCase } from "@/domain/forum/application/use-cases/create-question"

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreateQuestionBody = z.infer<typeof createQuestionBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private createQuestion: CreateQuestionUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @CurrentUser() user: TokenPayload,
    @Body(bodyValidationPipe) body: CreateQuestionBody,
  ) {
    const { title, content } = createQuestionBodySchema.parse(body)

    const userId = user.sub

    await this.createQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentsIds: []
    })
  }

}
