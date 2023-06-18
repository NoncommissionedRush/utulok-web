import { registerAs } from "@nestjs/config";
import { UserEntity } from "src/entities/user.entity";

export const dbConfig = registerAs("database", () => {
  let dbName: string;

  switch (process.env.NODE_ENV) {
    case "dev":
      dbName = process.env.DB_NAME_DEV;
      break;
    case "test":
      dbName = process.env.DB_NAME_TEST;
      break;
    case "prod":
      dbName = process.env.DB_NAME;
      break;
    default:
      dbName = process.env.DB_NAME;
  }

  return {
    type: "postgres",
    database: dbName,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: [UserEntity],
    synchronize: process.env.NODE_ENV === "dev" ||
      process.env.NODE_ENV == "test",
    autoLoadEntities: true,
    keepConnectionAlive: true,
  };
});

export const sessionConfig = registerAs("session", () => ({
  secret: process.env.SESSION_SECRET,
}));

export const s3Config = registerAs("s3", () => ({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  bucket: process.env.AWS_BUCKET,
}));
