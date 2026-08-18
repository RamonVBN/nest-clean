import { Module } from "@nestjs/common"
import { AuthenticateContrroller } from "./controllers/authenticate.controller"
import { CreateAccountController } from "./controllers/create-account.controller"
import { CreateQuestionController } from "./controllers/create-question.controller"
import { FetchRecentQuestionsController } from "./controllers/fetch-recents-questions.controller"
import { CreateQuestionUseCase } from "@/domain/forum/application/use-cases/create-question"
import { DatabaseModule } from "../database/database.module"
import { FetchRecentQuestionsUseCase } from "@/domain/forum/application/use-cases/fetch-recent-questions"

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthenticateContrroller,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [CreateQuestionUseCase, FetchRecentQuestionsUseCase],
})
export class HttpModule {}
