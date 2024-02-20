"use server";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

type Input = {
  name: string;
  password: string;
  email: string;
};

export async function signUp(input: Input): Promise<void> {
  const { email, name, password } = input;

  const userExists = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .get();

  if (userExists) {
    throw new Error("401");
  }

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  await db.insert(users).values({
    name,
    email,
    passwordHash,
    id: nanoid(),
  });
}
