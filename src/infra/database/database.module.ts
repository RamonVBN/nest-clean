import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaAnswerAttachmentsRepository } from "./prisma/repositories/prisma-answers-attachments-respository";
import { PrismaQuestionsRepository } from "./prisma/repositories/prisma-questions-repository";
import { PrismaQuestionsCommentsRespository } from "./prisma/repositories/prisma-questions-comment-repository";
import { PrismaQuestionsAttachmentsRepository } from "./prisma/repositories/prisma-questions-attachments-repository";
import { PrismaAnswerRepository } from "./prisma/repositories/prisma-answers-repository";
import { PrismaAnswerCommentsRepository } from "./prisma/repositories/prisma-answers-comments-repository";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { StudentsRepository } from "@/domain/forum/application/repositories/student-repository";
import { PrismaStudentsRepository } from "./prisma/repositories/prisma-students-repository";



@Module({
    providers: 
    [
        PrismaService, 
        {
            provide: QuestionsRepository,
            useClass: PrismaQuestionsRepository
        },
        {
            provide: StudentsRepository,
            useClass: PrismaStudentsRepository
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
        StudentsRepository, 
        PrismaQuestionsCommentsRespository,
        PrismaQuestionsAttachmentsRepository,
        PrismaAnswerRepository,
        PrismaAnswerCommentsRepository,
        PrismaAnswerAttachmentsRepository
    ],
})
export class DatabaseModule {}