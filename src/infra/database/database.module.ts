import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaAnswerAttachmentsRepository } from "./prisma/repositories/prisma-answers-attachments-respository";
import { PrismaQuestionsRespository } from "./prisma/repositories/prisma-questions-repository";
import { PrismaQuestionsCommentsRespository } from "./prisma/repositories/prisma-questions-comment-repository";
import { PrismaQuestionsAttachmentsRepository } from "./prisma/repositories/prisma-questions-attachments-repository";
import { PrismaAnswerRepository } from "./prisma/repositories/prisma-answers-repository";
import { PrismaAnswerCommentsRepository } from "./prisma/repositories/prisma-answers-comments-repository";



@Module({
    providers: 
    [
        PrismaService, 
        PrismaQuestionsRespository, 
        PrismaQuestionsCommentsRespository,
        PrismaQuestionsAttachmentsRepository,
        PrismaAnswerRepository,
        PrismaAnswerCommentsRepository,
        PrismaAnswerAttachmentsRepository
    ],
    exports: [
        PrismaService, 
        PrismaQuestionsRespository, 
        PrismaQuestionsCommentsRespository,
        PrismaQuestionsAttachmentsRepository,
        PrismaAnswerRepository,
        PrismaAnswerCommentsRepository,
        PrismaAnswerAttachmentsRepository
    ],
})
export class DatabaseModule {}