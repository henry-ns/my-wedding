import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    MERCADOPAGO_ACCESS_TOKEN: z.string(),

    CONTENTFUL_ACCESS_TOKEN: z.string(),
    CONTENTFUL_SPACE_ID: z.string(),
    MANAGEMENT_CONTENTFUL_ACCESS_TOKEN: z.string(),

    DATABASE_URL: z
      .string()
      .url()
      .refine(
        (str) => !str.includes("YOUR_MYSQL_URL_HERE"),
        "You forgot to change the default URL",
      ),
    DATABASE_AUTH_TOKEN: z.string(),

    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),

    NEXTAUTH_SECRET: z.string(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string() : z.string().url(),
    ),

    DISCORD_CLIENT_ID: z.string(),
    DISCORD_CLIENT_SECRET: z.string(),

    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
  },

  client: {
    NEXT_PUBLIC_GOOGLE_MAP_EMBED_URL: z.string(),
    NEXT_PUBLIC_WEDDING_DATE: z.string().transform((v) => new Date(v)),
    NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,

    MERCADOPAGO_ACCESS_TOKEN: process.env.MERCADOPAGO_ACCESS_TOKEN,
    NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY:
      process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY,

    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    MANAGEMENT_CONTENTFUL_ACCESS_TOKEN:
      process.env.MANAGEMENT_CONTENTFUL_ACCESS_TOKEN,

    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_AUTH_TOKEN: process.env.DATABASE_AUTH_TOKEN,

    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,

    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,

    GOOGLE_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,

    NEXT_PUBLIC_WEDDING_DATE: process.env.NEXT_PUBLIC_WEDDING_DATE,
    NEXT_PUBLIC_GOOGLE_MAP_EMBED_URL:
      process.env.NEXT_PUBLIC_GOOGLE_MAP_EMBED_URL,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
