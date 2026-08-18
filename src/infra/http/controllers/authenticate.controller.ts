import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { compare } from "bcryptjs"
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe"
import { PrismaService } from "@/infra/database/prisma/prisma.service"
import z from "zod"
import { AuthenticateStudentUseCase } from "@/domain/forum/application/use-cases/authenticate-student"
import { WrongCredentialsErrors } from "@/domain/forum/application/use-cases/errors/wrong-credential-errors"
import { Public } from "@/infra/auth/public"

const authenticateBodySchema = z.object({
  email: z.email(),
  password: z.string(),
})

type AuthenticateBody = z.infer<typeof authenticateBodySchema>

@Controller("/sessions")
export class AuthenticateContrroller {
  constructor(
    private authenticateStudent: AuthenticateStudentUseCase
  ) {}

  @Post()
  @HttpCode(201)
  @Public()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBody) {
    const { email, password } = authenticateBodySchema.parse(body)

    const result = await this.authenticateStudent.execute({email, password})

    if (result.isLeft()){

      const error = result.value
      switch (error.constructor) {
        case WrongCredentialsErrors:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken } = result.value

    return {
      access_token: accessToken
    }
  }
}
