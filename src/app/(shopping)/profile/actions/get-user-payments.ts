"use server";

import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { payments } from "~/server/db/schema";

export async function getUserPayments(userId: string) {
  const userPayments = await db.query.payments.findMany({
    where: eq(payments.payerId, userId),
    with: {
      gifts: true,
    },
  });

  return userPayments;
}
