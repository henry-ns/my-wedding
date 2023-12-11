"use server";

import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { db } from "../db";
import { presences } from "../db/schema";

export type Presence = {
  id: string;
  check: boolean;
  userId: string;
  checkedAt: Date;
};

export async function getUserPresence(
  userId: string,
): Promise<Presence | undefined> {
  return db.select().from(presences).where(eq(presences.userId, userId)).get();
}

type UpdatePresenceInput = {
  userId: string;
  check: boolean;
};

export async function setPresence({
  userId,
  check,
}: UpdatePresenceInput): Promise<void> {
  const presenceExists = await getUserPresence(userId);

  if (!presenceExists) {
    await db.insert(presences).values({
      id: nanoid(),
      checkedAt: new Date(),
      userId,
      check,
    });
  }

  await db
    .update(presences)
    .set({
      check,
      checkedAt: new Date(),
    })
    .where(eq(presences.userId, userId));
}
