import { Module } from "@nestjs/common"
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from "@nestjs/jwt"
import { ConfigService } from "@nestjs/config"
import { Env } from "@/infra/env/env"
import { JwtStrategy } from "./jwt.strategy"
import { APP_GUARD } from "@nestjs/core"
import { JwtAuthGuard } from "./jwt.guard"
import { EnvModule } from "../env/env.module"

@Module({
  imports: [
    PassportModule,
    EnvModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService<Env, true>) {
        const privateKey = config.get("JWT_PRIVATE_KEY", { infer: true })
        const publicKey = config.get("JWT_PUBLIC_KEY", { infer: true })

        return {
          signOptions: { algorithm: "RS256" },
          privateKey: Buffer.from(privateKey, "base64"),
          publicKey: Buffer.from(publicKey, "base64"),
        }
      },
      global: true,
    }),
  ],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
