import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { compare } from "bcryptjs"
import { ZodValidationPipe } from "@/pipes/zod-validation-pipe"
import { PrismaService } from "@/prisma/prisma.service"
import z from "zod"

const authenticateBodySchema = z.object({
  email: z.email(),
  password: z.string(),
})

type AuthenticateBody = z.infer<typeof authenticateBodySchema>

@Controller("/sessions")
export class AuthenticateContrroller {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBody) {
    const { email, password } = authenticateBodySchema.parse(body)

    const userExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!userExists) {
      throw new UnauthorizedException("User credentials do not match")
    }

    const isPasswordValid = compare(password, userExists.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException("User credentials do not match")
    }

    const accessToken = this.jwt.sign({ sub: userExists.id })

    return {
      access_token: accessToken,
    }
  }
}
