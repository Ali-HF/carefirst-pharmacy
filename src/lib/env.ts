import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().optional().default(""),
  AUTH_SECRET: z.string().optional().default("carefirst-default-secret"),
  TWILIO_AUTH_TOKEN: z.string().optional(),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ Invalid environment variables:", JSON.stringify(_env.error.format(), null, 2));
  if (process.env.NODE_ENV === "production") {
    throw new Error("Invalid environment variables in production environment.");
  }
}

export const env = _env.success ? _env.data : {
  DATABASE_URL: process.env.DATABASE_URL || "",
  AUTH_SECRET: process.env.AUTH_SECRET || "carefirst-default-secret",
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  NODE_ENV: "development" as const,
};
