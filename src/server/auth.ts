import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  Session,
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { redirect } from "next/navigation";
import { env } from "~/env";
import { db } from "~/server/db";
import { users } from "./db/schema";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    async session({ session, token, trigger, newSession }) {
      if (token.sub) {
        session.user.id = token.sub;
      }

      if (trigger === "update" && newSession?.name) {
        session.user.name = newSession.name;
      }

      return session;
    },
  },
  debug: env.NODE_ENV === "development",
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  adapter: DrizzleAdapter(db) as any,
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "Cadastrar",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "exemplo@email.com",
        },
        password: {
          label: "Senha",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Preencha o formulário");
        }

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email))
          .get();

        if (!user?.passwordHash) {
          throw new Error("Utilize o mesmo método de autenticação");
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.passwordHash,
        );

        if (!isPasswordCorrect) {
          throw new Error("Email e senha não correspondem");
        }

        return {
          id: user.id,
          email: user.email,
          image: user.image,
          name: user.name,
        };
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);

export async function requireAuthentication(
  redirectTo?: string,
): Promise<Session> {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(redirectTo ? `/sign-in?${redirectTo}` : "/sign-in");
  }

  return session;
}
