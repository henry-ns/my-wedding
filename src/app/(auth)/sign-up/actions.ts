"use server";

import bcrypt from "bcryptjs";
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
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  await db.insert(users).values({
    name,
    email,
    passwordHash,
    id: nanoid(),
  });
}
