import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaAnswerAttachmentsRepository } from "./prisma/repositories/prisma-answers-attachments-respository";
import { PrismaQuestionsRepository } from "./prisma/repositories/prisma-questions-repository";
import { PrismaQuestionsCommentsRespository } from "./prisma/repositories/prisma-questions-comment-repository";
import { PrismaQuestionsAttachmentsRepository } from "./prisma/repositories/prisma-questions-attachments-repository";
import { PrismaAnswerRepository } from "./prisma/repositories/prisma-answers-repository";
import { PrismaAnswerCommentsRepository } from "./prisma/repositories/prisma-answers-comments-repository";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";



@Module({
    providers: 
    [
        PrismaService, 
        {
            provide: QuestionsRepository,
            useClass: PrismaQuestionsRepository
        }, 
        PrismaQuestionsCommentsRespository,
        PrismaQuestionsAttachmentsRepository,
        PrismaAnswerRepository,
        PrismaAnswerCommentsRepository,
        PrismaAnswerAttachmentsRepository
    ],
    exports: [
        PrismaService, 
        QuestionsRepository, 
        PrismaQuestionsCommentsRespository,
        PrismaQuestionsAttachmentsRepository,
        PrismaAnswerRepository,
        PrismaAnswerCommentsRepository,
        PrismaAnswerAttachmentsRepository
    ],
})
export class DatabaseModule {}