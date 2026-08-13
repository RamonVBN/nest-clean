import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common"
import { CurrentUser } from "@/infra/auth/current-user-decorator"
import type { TokenPayload } from "@/infra/auth/jwt.strategy"
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe"
import { PrismaService } from "@/infra/database/prisma/prisma.service"
import z from "zod"
import { JwtAuthGuard } from "@/infra/auth/jwt.guard"

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreateQuestionBody = z.infer<typeof createQuestionBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

@Controller("/questions")
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  async handle(
    @CurrentUser() user: TokenPayload,
    @Body(bodyValidationPipe) body: CreateQuestionBody,
  ) {
    const { title, content } = createQuestionBodySchema.parse(body)

    const slug = this.slugify(title)

    await this.prisma.question.create({
      data: {
        title,
        content,
        authorId: user.sub,
        slug,
      },
    })
  }

  private slugify(title: string) {
    return title
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  }
}
