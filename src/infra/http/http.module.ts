import { Module } from "@nestjs/common"
import { AuthenticateContrroller } from "./controllers/authenticate.controller"
import { CreateAccountController } from "./controllers/create-account.controller"
import { CreateQuestionController } from "./controllers/create-question.controller"
import { FetchRecentQuestionsController } from "./controllers/fetch-recents-questions.controller"
import { PrismaService } from "../database/prisma/prisma.service"

@Module({
  controllers: [
    CreateAccountController,
    AuthenticateContrroller,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [PrismaService],
})
export class HttpModule {}
