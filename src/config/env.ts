import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z
    .string()
    .default("4000")
    .transform((val) => Number(val)),

  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

  JWT_ACCESS_SECRET: z.string().min(10, "JWT_ACCESS_SECRET is required"),

  JWT_REFRESH_SECRET: z.string().min(10, "JWT_REFRESH_SECRET is required"),

  CLIENT_URL: z.string().url().optional(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:");
  console.error(parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;
