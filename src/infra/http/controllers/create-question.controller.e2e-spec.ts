import request from "supertest"
import { INestApplication } from "@nestjs/common"
import { PrismaService } from "@/infra/database/prisma/prisma.service.js"
import { JwtService } from "@nestjs/jwt"

describe("Create Question (E2E)", () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const { Test } = await import("@nestjs/testing")
    const { AppModule } = await import("../../app.module.js") // ou '../app.module.js' se necessário
    const { PrismaService } =
      await import("../../database/prisma/prisma.service.js")

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test("POST /questions", async () => {
    const user = await prisma.user.create({
      data: {
        name: "ramon",
        email: "ramon@test.com",
        password: "123456",
      },
    })

    const accessToken = jwt.sign({ sub: user.id })

    const response = await request(app.getHttpServer())
      .post("/questions")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        title: "New Question",
        content: "Question",
      })

    expect(response.statusCode).toBe(201)

    const isQuestionOnDatabase = await prisma.question.findFirst({
      where: {
        title: "New Question",
      },
    })

    expect(isQuestionOnDatabase).toBeTruthy()
  })
})
