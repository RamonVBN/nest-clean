import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionAttachmentsRepository } from "@/domain/forum/application/repositories/question-attachments-repository";
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment";
import { Injectable } from "@nestjs/common";
import { Question } from "generated/prisma/browser";

@Injectable()
export class PrismaQuestionsAttachmentsRepository implements QuestionAttachmentsRepository
 {
    findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
        throw new Error("Method not implemented.");
    }
    deleteManyByQuestionId(questionId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<Question | null> {
        throw new Error("Method not implemented.");
    }
    findBySlug(slug: string): Promise<Question | null> {
        throw new Error("Method not implemented.");
    }
    findManyRecent(params: PaginationParams): Promise<Question[]> {
        throw new Error("Method not implemented.");
    }
    save(question: Question): Promise<void> {
        throw new Error("Method not implemented.");
    }
    create(question: Question): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(question: Question): Promise<void> {
        throw new Error("Method not implemented.");
    }

}