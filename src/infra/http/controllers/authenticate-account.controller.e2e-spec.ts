import request from "supertest"
import { INestApplication } from "@nestjs/common"
import { PrismaService } from "@/infra/database/prisma/prisma.service.js"
import { hash } from "bcryptjs"

describe("Authenticate(E2E)", () => {
  let app: INestApplication
  let prisma: PrismaService

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

    await app.init()
  })

  test("POST /sessions", async () => {
    await prisma.user.create({
      data: {
        name: "Ramon",
        email: "ramon@test.com",
        password: await hash("123456", 8),
      },
    })

    const response = await request(app.getHttpServer()).post("/sessions").send({
      email: "ramon@test.com",
      password: "123456",
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      access_token: expect.any(String),
    })
  })
})
