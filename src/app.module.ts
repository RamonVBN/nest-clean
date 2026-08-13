import { Module } from "@nestjs/common"
import { PrismaService } from "./prisma/prisma.service"
import { ConfigModule } from "@nestjs/config"
import { CreateAccountController } from "./controllers/create-account.controller"
import { envSchema } from "./env"
import { AuthenticateContrroller } from "./controllers/authenticate.controller"
import { AuthModule } from "./auth/auth-module"
import { CreateQuestionController } from "./controllers/create-question.controller"
import { FetchRecentQuestionsController } from "./controllers/fetch-recents-questions.controller"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
    AuthModule,
  ],

  controllers: [CreateAccountController, AuthenticateContrroller, CreateQuestionController, FetchRecentQuestionsController],
  providers: [PrismaService],
})
export class AppModule {}
