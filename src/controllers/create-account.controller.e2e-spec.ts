import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

describe('Create account (E2E)', () => {

    let app: INestApplication;
    let prisma: PrismaService

    beforeAll(async () => {

        const { Test } = await import('@nestjs/testing')
        const { AppModule } = await import('../app.module.js') // ou '../app.module.js' se necessário
        const { PrismaService } = await import('../prisma/prisma.service.js')

        const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
        }).compile();

        app = moduleRef.createNestApplication();
        prisma = moduleRef.get(PrismaService)

        await app.init();
    });

    test('POST /accounts', async () => {

        const response = await request(app.getHttpServer()).post('/accounts').send({
            name: 'ramon',
            email: 'ramon@test.com',
            password: '123456'
        })

        expect(response.statusCode).toBe(201)

        const isUserOnDatabase = await prisma.user.findUnique({
            where: {
                email: 'ramon@test.com'
            }
        })

        expect(isUserOnDatabase).toBeTruthy()
    })
})