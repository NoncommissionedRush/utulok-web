import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as session from "express-session";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { DogsModule } from "./dogs/dogs.module";
import { AuthModule } from "./auth/auth.module";
import { dbConfig, s3Config, sessionConfig } from "./config/configuration";
import { S3Module } from './s3/s3.module';
import { AdoptionModule } from './adoption/adoption.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig, sessionConfig, s3Config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => config.get("database"),
    }),
    UsersModule,
    DogsModule,
    AuthModule,
    S3Module,
    AdoptionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          cookie: {
            maxAge: 60 * 60 * 24,
            httpOnly: true,
            sameSite: "lax",
            secure: false,
          },
          secret: this.configService.get("session.secret"),
          resave: true,
          saveUninitialized: true,
        }),
      )
      .forRoutes("*");
  }
}
