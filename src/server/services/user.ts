"use server";

import { eq } from "drizzle-orm";

import { db } from "../db";
import { users } from "../db/schema";

type Input = {
  id: string;
  name: string;
};

export async function getUser(userId: string) {
  return db.select().from(users).where(eq(users.id, userId)).get();
}

export async function updateUser({ id, name }: Input) {
  await db.update(users).set({ name }).where(eq(users.id, id));
}
